import { useEffect, useRef, useState } from 'react'
import './TextArea.css'
import { keepCursorInView } from './utils/keepCursorInView'
import { getRightText } from './utils/getRightText'
import { getWrongText } from './utils/getWrongText'
import InactivityCurtain from './InactivityCurtain'
import {
  useText,
  useTextActions,
  useTextAfterCursor,
  useTextBeforeCursor,
  useWrongTextStartIndex,
} from '../../stores/TextStore'

function TextArea({
  typingContainerRef,
}: { typingContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const text = useText()
  const textBeforeCursor = useTextBeforeCursor()
  const textAfterCursor = useTextAfterCursor()
  const wrongTextStartIndex = useWrongTextStartIndex()
  const { setCorrectText } = useTextActions()

  const textAreaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  useEffect(() => keepCursorInView(cursorRef.current, textAreaRef.current), [
    textBeforeCursor,
    textAfterCursor,
  ])
  useEffect(() => {
    const textArea = textAreaRef.current
    if (!textArea) return
    textArea.style.animation = 'none'
    // Causes a reflow to reset the animation
    textArea.offsetHeight
    textArea.style.animation = ''
  }, [text])

  const [isCurrentlyTyping, setIsCurrentlyTyping] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)
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
      <InactivityCurtain />
      <div id='text-area' ref={textAreaRef}>
        <span id='correct-text' className='unselectable-text'>
          {correctText}
        </span>
        <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
        <span
          id='cursor'
          ref={cursorRef}
          className={isCurrentlyTyping || true ? 'paused' : ''}
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
