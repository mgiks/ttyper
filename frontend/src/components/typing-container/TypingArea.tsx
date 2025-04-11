import { useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { TextMessage } from './dtos/message'
import { connectWebSocket } from './utils/connectWebSocket'
import { toggleFocusOfTypingArea } from './utils/toggleFocusOfTypingArea'
import { isControlKey } from './utils/isControlKey'
import { useStartedAndDoneTypingStore } from '../../store-hooks/useStartedTypingStore'
import { useTextStore } from '../../store-hooks/useTextStore'
import { useWrongKeyCountStore } from '../../store-hooks/useWrongKeyCountStore'

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
  const setText = useTextStore((state) => state.setText)
  useEffect(() => {
    if (websocketConnection.current) return
    function handleMessage(e: MessageEvent) {
      const message: TextMessage = JSON.parse(e.data)
      if (message.messageType === 'text') {
        const text = message.data.text
        setText(text)
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

  const setIsDoneTypingToTrue = useStartedAndDoneTypingStore((state) =>
    state.setIsDoneTypingToTrue
  )
  function updateText() {
    const leadingText = textArray.slice(0, currentCursorIndex).join('')
    setLeadingText(leadingText)
    const trailingText = textArray.slice(currentCursorIndex).join('')
    setTrailingText(trailingText)
    if (leadingText && !trailingText) {
      setIsDoneTypingToTrue()
    }
  }
  useEffect(updateText, [currentCursorIndex])

  const setIsTypingToTrue = useStartedAndDoneTypingStore((state) =>
    state.setIsTypingToTrue
  )
  const increaseWrongKeyCount = useWrongKeyCountStore((state) =>
    state.increaseWrongKeyCount
  )
  function handleKeypress(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    if (isControlKey(key)) return
    const wrongKeyIndex = getWrongKeyIndex(key)
    if (wrongKeyIndex !== undefined) {
      setWrongTextStartIndex(wrongKeyIndex)
    }
    if (wrongKeyIndex !== undefined && wrongKeyIndex !== -1) {
      increaseWrongKeyCount()
    }
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
