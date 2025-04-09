import { useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { TextMessage } from './dtos/message'
import { connectWebSocket } from './utils/connectWebSocket'
import { toggleFocusOfTypingArea } from './utils/toggleFocusOfTypingArea'
import { isControlKey } from './utils/isControlKey'
import { useStartedTypingStore } from '../../store-hooks/useStartedTypingStore'

let getWrongKeyIndex: (_: string) => number | undefined

function TypingArea(
  {
    isTypingContainerFocused,
    setLeadingText,
    setTrailingText,
    setWrongTextStartIndex,
  }: {
    isTypingContainerFocused: number
    setLeadingText: (_: React.SetStateAction<string>) => void
    setTrailingText: (_: React.SetStateAction<string>) => void
    setWrongTextStartIndex: (_: React.SetStateAction<number>) => void
  },
) {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(
    () => toggleFocusOfTypingArea(isTypingContainerFocused, typingAreaRef),
    [isTypingContainerFocused],
  )

  const websocketConnection = useRef<WebSocket>(null)
  const [textArray, setTextArray] = useState([''])
  useEffect(() => {
    if (websocketConnection.current) return
    function handleMessage(e: MessageEvent) {
      const message: TextMessage = JSON.parse(e.data)
      if (message.messageType === 'text') {
        const text = message.data.text
        setTextArray(text.split(''))
        setTrailingText(text)
        getWrongKeyIndex = trackTextForWrongKeys(text)
      }
    }
    websocketConnection.current = connectWebSocket(handleMessage)
  }, [websocketConnection.current])

  const [currentCursorIndex, setCurrentCursorIndex] = useState(0)
  function setCursorPosition(key: string) {
    const keyIsOutOfBounds = key === 'Backspace' && currentCursorIndex === 0
    if (keyIsOutOfBounds) return
    setCurrentCursorIndex((prevCursorIndex) =>
      prevCursorIndex + (key === 'Backspace' ? -1 : 1)
    )
  }
  function updateText() {
    setLeadingText(textArray.slice(0, currentCursorIndex).join(''))
    setTrailingText(textArray.slice(currentCursorIndex).join(''))
  }
  useEffect(updateText, [currentCursorIndex])

  const setIsTypingToTrue = useStartedTypingStore((state) =>
    state.setIsTypingToTrue
  )
  function handleKeypress(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    if (isControlKey(key)) return
    const wrongKeyIndex = getWrongKeyIndex(key)
    wrongKeyIndex !== undefined && setWrongTextStartIndex(wrongKeyIndex)
    setCursorPosition(key)
    setIsTypingToTrue()
  }

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
