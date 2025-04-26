import { useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { RandomTextMessage } from './dtos/message'
import { toggleFocusOfTypingArea } from './utils/toggleFocusOfTypingArea'
import { isControlKey } from './utils/isControlKey'
import {
  useCursorIndex,
  useTextActions,
  useTextRefreshCount,
} from '../../stores/TextStore'
import { useTypingStatsActions } from '../../stores/TypingStatsStore'

let getWrongKeyIndex: (_: string) => number | undefined

function TypingArea(
  { typingContainerFocusCount }: {
    typingContainerFocusCount: number
  },
) {
  const textRefreshCount = useTextRefreshCount()
  const cursorIndex = useCursorIndex()
  const {
    setTextBeforeCursor,
    setTextAfterCursor,
    setWrongTextStartIndex,
    setText,
    setCursorIndex,
  } = useTextActions()
  const {
    finishTypingGame,
    increaseWrongKeyCount,
    increaseCorrectKeyCount,
    setCursorToMoved,
  } = useTypingStatsActions()

  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(
    () => toggleFocusOfTypingArea(typingContainerFocusCount, typingAreaRef),
    [typingContainerFocusCount],
  )

  const [textArray, setTextArray] = useState([''])
  useEffect(() => {
    fetch('http://localhost:8000/random-texts')
      .then((response) => response.json())
      .then((json) => {
        if (
          Object.hasOwn(json, 'messageType') &&
          json.messageType === 'randomText'
        ) {
          const randomTextMessage = json as RandomTextMessage
          const text = randomTextMessage.data.text
          setTextArray(text.split(''))
          getWrongKeyIndex = trackTextForWrongKeys(text)
          setText(text)
        }
      })
  }, [textRefreshCount])

  function setCursorPosition(key: string) {
    const isKeyIsOutOfBounds = key === 'Backspace' && cursorIndex === 0
    if (isKeyIsOutOfBounds) return
    setCursorIndex(key)
  }
  useEffect(() => {
    cursorIndex > 0 && setCursorToMoved()
  }, [cursorIndex])

  const textBeforeCursor = textArray.slice(0, cursorIndex).join('')
  const textAfterCursor = textArray.slice(cursorIndex).join('')
  useEffect(() => {
    setTextAfterCursor(textAfterCursor)
    setTextBeforeCursor(textBeforeCursor)
    if (textBeforeCursor && !textAfterCursor) finishTypingGame()
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
    wrongKeyIndex > -1 ? increaseWrongKeyCount() : increaseCorrectKeyCount()
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
