import { useContext, useEffect, useRef } from 'react'
import './TextArea.css'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'
import { LeadingTextContext } from './context/LeadingTextContext'
import { TrailingTextContext } from './context/TrailingTextContext'
import { keepCursorInView } from './utils/keepCursorInView'
import { getRightText } from './utils/getRightText'
import { getWrongText } from './utils/getWrongText'

function TextArea() {
  const textAreaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  useEffect(() => keepCursorInView(cursorRef, textAreaRef))

  const { leadingText } = useContext(LeadingTextContext)
  const { trailingText } = useContext(TrailingTextContext)
  const { wrongTextStartIndex } = useContext(WrongTextStartIndexContext)
  const rightText = getRightText(leadingText, wrongTextStartIndex)
  const wrongText = getWrongText(leadingText, wrongTextStartIndex)

  return (
    <div id='text-area' ref={textAreaRef}>
      <span id='right-text' className='unselectable-text'>{rightText}</span>
      <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
      <span id='cursor' ref={cursorRef}></span>
      <span id='trailing-text' className='unselectable-text'>
        {trailingText}
      </span>
    </div>
  )
}

export default TextArea
