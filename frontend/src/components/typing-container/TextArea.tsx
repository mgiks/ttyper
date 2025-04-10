import { useEffect, useRef, useState } from 'react'
import './TextArea.css'
import { keepCursorInView } from './utils/keepCursorInView'
import { getRightText } from './utils/getRightText'
import { getWrongText } from './utils/getWrongText'
import InactivityCurtain from './InactivityCurtain'

function TextArea(
  { isTypingContainerFocused, leadingText, trailingText, wrongTextStartIndex }:
    {
      isTypingContainerFocused: number
      leadingText: string
      trailingText: string
      wrongTextStartIndex: number
    },
) {
  const textAreaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  useEffect(() => keepCursorInView(cursorRef, textAreaRef))

  const [isUserTyping, setIsUserTyping] = useState(false)
  const timeoutRef = useRef<number>(null)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsUserTyping(true)

    timeoutRef.current = setTimeout(() => {
      setIsUserTyping(false)
    }, 750)
  }, [leadingText])

  const rightText = getRightText(leadingText, wrongTextStartIndex)
  const wrongText = getWrongText(leadingText, wrongTextStartIndex)

  return (
    <>
      <InactivityCurtain isTypingContainerFocused={isTypingContainerFocused} />
      <div id='text-area' ref={textAreaRef}>
        <span id='right-text' className='unselectable-text'>{rightText}</span>
        <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
        <span
          id='cursor'
          ref={cursorRef}
          className={isUserTyping || !isTypingContainerFocused ? 'paused' : ''}
        >
        </span>
        <span id='trailing-text' className='unselectable-text'>
          {trailingText}
        </span>
      </div>
    </>
  )
}

export default TextArea
