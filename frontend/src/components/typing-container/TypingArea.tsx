import { useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { TextMessage } from './dtos/message'
import { connectWebSocket } from './utils/connectWebSocket'
import { toggleFocusOfTypingArea } from './utils/toggleFocusOfTypingArea'
import { isControlKey } from './utils/isControlKey'
import { useTextActions } from '../../stores/TextStore'
import { useTypingStatsActions } from '../../stores/TypingStatsStore'

let getWrongKeyIndex: (_: string) => number | undefined

function TypingArea(
  { typingContainerFocusCount }: { typingContainerFocusCount: number },
) {
  const {
    setTextBeforeCursor,
    setTextAfterCursor,
    setWrongTextStartIndex,
    setText,
  } = useTextActions()
  const {
    finishTyping,
    increaseWrongKeyCount,
    setCursorToMoved,
  } = useTypingStatsActions()

  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(
    () => toggleFocusOfTypingArea(typingContainerFocusCount, typingAreaRef),
    [typingContainerFocusCount],
  )

  const websocketConnection = useRef<WebSocket>(null)
  const [textArray, setTextArray] = useState([''])
  useEffect(() => {
    if (websocketConnection.current) return
    function handleMessage(e: MessageEvent) {
      const message: TextMessage = JSON.parse(e.data)
      if (message.messageType === 'text') {
        const text = message.data.text
        setText(text)
        setTextAfterCursor(text)
        setTextArray(text.split(''))
        getWrongKeyIndex = trackTextForWrongKeys(text)
      }
    }
    websocketConnection.current = connectWebSocket(handleMessage)
  }, [websocketConnection.current])

  const [currentCursorIndex, setCurrentCursorIndex] = useState(0)
  function setCursorPosition(key: string) {
    const isKeyIsOutOfBounds = key === 'Backspace' && currentCursorIndex === 0
    if (isKeyIsOutOfBounds) return
    setCurrentCursorIndex((prevCursorIndex) =>
      prevCursorIndex + (key === 'Backspace' ? -1 : 1)
    )
  }
  useEffect(() => {
    currentCursorIndex > 0 && setCursorToMoved()
  }, [currentCursorIndex])

  const textBeforeCursor = textArray.slice(0, currentCursorIndex).join('')
  const textAfterCursor = textArray.slice(currentCursorIndex).join('')
  useEffect(() => {
    setTextAfterCursor(textAfterCursor)
    setTextBeforeCursor(textBeforeCursor)
    if (textBeforeCursor && !textAfterCursor) finishTyping()
  })

  function handleKeypress(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    if (isControlKey(key)) return
    setCursorPosition(key)

    const wrongKeyIndex = getWrongKeyIndex(key)
    if (wrongKeyIndex == undefined) return
    setWrongTextStartIndex(wrongKeyIndex)
    wrongKeyIndex > -1 && increaseWrongKeyCount()
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
