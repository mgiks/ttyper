import { useEffect, useRef, useState } from 'react'
import './TextArea.css'
import { keepCursorInView } from './utils/keepCursorInView'
import { getRightText } from './utils/getRightText'
import { getWrongText } from './utils/getWrongText'
import InactivityCurtain from './InactivityCurtain'
import {
  useTextActions,
  useTextAfterCursor,
  useTextBeforeCursor,
  useWrongTextStartIndex,
} from '../../stores/TextStore'

function TextArea(
  { isTypingContainerFocused }: { isTypingContainerFocused: number },
) {
  const textBeforeCursor = useTextBeforeCursor()
  const textAfterCursor = useTextAfterCursor()
  const wrongTextStartIndex = useWrongTextStartIndex()
  const { setCorrectText } = useTextActions()

  const textAreaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  useEffect(() => keepCursorInView(cursorRef, textAreaRef))

  const [isCurrentlyTyping, setIsCurrentlyTyping] = useState(false)
  const timeoutRef = useRef<number>(null)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsCurrentlyTyping(true)

    timeoutRef.current = setTimeout(() => {
      setIsCurrentlyTyping(false)
    }, 750)
  }, [textBeforeCursor])

  const correctText = getRightText(textBeforeCursor, wrongTextStartIndex)
  const wrongText = getWrongText(textBeforeCursor, wrongTextStartIndex)
  useEffect(() => {
    setCorrectText(correctText)
  })

  return (
    <>
      <InactivityCurtain isTypingContainerFocused={isTypingContainerFocused} />
      <div id='text-area' ref={textAreaRef}>
        <span id='correct-text' className='unselectable-text'>
          {correctText}
        </span>
        <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
        <span
          id='cursor'
          ref={cursorRef}
          className={isCurrentlyTyping || !isTypingContainerFocused
            ? 'paused'
            : ''}
        >
        </span>
        <span id='trailing-text' className='unselectable-text'>
          {textAfterCursor}
        </span>
      </div>
    </>
  )
}

export default TextArea
