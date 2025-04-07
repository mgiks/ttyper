import { useContext, useEffect, useRef } from 'react'
import './TextArea.css'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'
import { LeadingTextContext } from './context/LeadingTextContext'
import { TrailingTextContext } from './context/TrailingTextContext'

function TextArea() {
  const textAreaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const cursor = cursorRef.current
    const textArea = textAreaRef.current
    if (!cursor || !textArea) {
      return
    }
    const cursorYPosition = cursor.getBoundingClientRect().y
    const textAreaTopYCoor = textArea.getBoundingClientRect().y
    const textAreaHeight = textArea.getBoundingClientRect().height
    const textAreaBottomYCoor = textAreaTopYCoor + textAreaHeight
    const isCursorInsideTextArea = textAreaTopYCoor < cursorYPosition &&
      cursorYPosition < textAreaBottomYCoor

    if (!isCursorInsideTextArea) {
      cursor.scrollIntoView({ behavior: 'smooth' })
    }
  })

  const { leadingText } = useContext(LeadingTextContext)
  const { trailingText } = useContext(TrailingTextContext)
  const { wrongTextStartIndex } = useContext(WrongTextStartIndexContext)
  const rightText = wrongTextStartIndex > -1
    ? leadingText.slice(0, wrongTextStartIndex)
    : leadingText
  const wrongText = wrongTextStartIndex > -1
    ? leadingText.slice(wrongTextStartIndex)
    : ''

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
