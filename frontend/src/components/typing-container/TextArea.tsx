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
  { typingContainerRef, typingContainerFocusCount }: {
    typingContainerRef: React.RefObject<HTMLDivElement | null>
    typingContainerFocusCount: number
  },
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

  useEffect(() => {
    if (typingContainerRef.current && textAreaRef.current) {
      const textArea = textAreaRef.current
      const typingContainer = typingContainerRef.current
      // It's easier to work with integer line height
      const lineHeight = Math.round(
        parseFloat(getComputedStyle(textArea).lineHeight),
      )
      textArea.style.lineHeight = lineHeight.toString() + 'px'
      const topAndBottomMargin = 30
      const numberOfLines = 5
      const typingContainerHeight =
        (lineHeight * numberOfLines + topAndBottomMargin).toString() + 'px'
      typingContainer.style.height = typingContainerHeight
    }
  }, [typingContainerRef.current, textAreaRef.current])

  return (
    <>
      <InactivityCurtain
        typingContainerFocusCount={typingContainerFocusCount}
      />
      <div id='text-area' ref={textAreaRef}>
        <span id='correct-text' className='unselectable-text'>
          {correctText}
        </span>
        <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
        <span
          id='cursor'
          ref={cursorRef}
          className={isCurrentlyTyping || typingContainerFocusCount === 0
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
