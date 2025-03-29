import { useContext, useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { TextMessage } from '../shared/dtos/message'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'

let getWrongKeyIndex: (_: string) => number | undefined

function TypingArea() {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)
  const { setWrongTextStartIndex } = useContext(WrongTextStartIndexContext)
  const websocketConnection = useRef<WebSocket | null>(null)
  const { setLeadingText, setTrailingText } = useContext(
    LeadingAndTralingTextContext,
  )
  const [textArray, setTextArray] = useState([''])

  useEffect(() => {
    if (websocketConnection.current) {
      return
    }

    function handleMessage(e: MessageEvent) {
      const message: TextMessage = JSON.parse(e.data)
      const messageType = message.messageType
      const messageData = message.data

      if (messageType === 'text') {
        const text = messageData.text
        setTextArray(text.split(''))
        setTrailingText(text)
        getWrongKeyIndex = trackTextForWrongKeys(text)
      }
    }

    function connectWebSocket() {
      const ws = new WebSocket('ws://localhost:8000')
      ws.onopen = () => {
        console.log('Connected to websocket server')
      }
      ws.onmessage = handleMessage

      websocketConnection.current = ws
    }
    connectWebSocket()
  }, [websocketConnection.current])

  const [currentCursorIndex, setCurrentCursorIndex] = useState(0)

  function setCursorPosition(key: string) {
    const keyIsOutOfBounds = key === 'Backspace' && currentCursorIndex == 0
    if (keyIsOutOfBounds) {
      return
    }

    if (key === 'Backspace') {
      setCurrentCursorIndex((prevCursorIndex) => prevCursorIndex - 1)
    } else {
      setCurrentCursorIndex((prevCursorIndex) => prevCursorIndex + 1)
    }
  }

  function updateText() {
    setLeadingText(textArray.slice(0, currentCursorIndex).join(''))
    setTrailingText(textArray.slice(currentCursorIndex).join(''))
  }
  useEffect(updateText, [currentCursorIndex])

  function handleKeypress(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    const keyIsControlKey = key !== 'Backspace' && key.length > 1
    if (keyIsControlKey) {
      return
    }
    const wrongKeyIndex = getWrongKeyIndex(key)
    if (wrongKeyIndex) {
      setWrongTextStartIndex(wrongKeyIndex)
    }
    setCursorPosition(key)
  }

  function toggleFocus() {
    const typingArea = typingAreaRef.current!
    isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
  }
  useEffect(toggleFocus, [isTypingContainerFocused])

  return (
    <textarea
      ref={typingAreaRef}
      onKeyDown={handleKeypress}
      id='typing-area'
      autoFocus
    />
  )
}

export default TypingArea
