import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { TextMessage } from '../shared/dtos/message'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'

function trackText(text: string) {
  const trackedText = text.split('')
  let currentCharIndex = 0

  return function (key: string) {
    const currentChar = trackedText[currentCharIndex]
    const nextCharIndex = currentCharIndex + 1
    currentCharIndex = nextCharIndex

    if (key != currentChar) {
      return false
    }
    return true
  }
}

let checkKey: (_: string) => boolean

function TypingArea() {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)
  const websocketConnection = useRef<WebSocket | null>(null)
  const [websocketConnectionEstablished, setWebsocketConnectionEstablished] =
    useState(false)
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
        checkKey = trackText(text)
      }
    }

    function connectWebSocket() {
      const ws = new WebSocket('ws://localhost:8000')
      ws.onopen = () => {
        console.log('Connected to websocket server')
        setWebsocketConnectionEstablished(true)
      }
      ws.onmessage = handleMessage

      websocketConnection.current = ws
    }
    connectWebSocket()
  }, [websocketConnection.current])

  function sendKeypress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!websocketConnectionEstablished) {
      return
    }

    const key = event.key
    // Needed to exclude control keys
    if (key != 'Backspace' && key.length > 1) {
      return
    }
    websocketConnection.current?.send(key)
    console.log('Key press sent:', key)
  }

  const [currentCursorIndex, setCurrentCursorIndex] = useState(0)

  function setCursorPosition(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    const keyIsControlKey = key !== 'Backspace' && key.length > 1
    const keyIsOutOfBounds = key === 'Backspace' && currentCursorIndex == 0

    if (keyIsControlKey || keyIsOutOfBounds) {
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

  function toggleFocus() {
    const typingArea = typingAreaRef.current!

    isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
  }

  useEffect(toggleFocus, [isTypingContainerFocused])

  return (
    <textarea
      ref={typingAreaRef}
      onKeyDown={setCursorPosition}
      id='typing-area'
      autoFocus
    />
  )
}

export default TypingArea
