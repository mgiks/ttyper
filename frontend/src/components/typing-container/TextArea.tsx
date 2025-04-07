import { useContext, useEffect, useRef } from 'react'
import './TextArea.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'

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

  const { leadingText } = useContext(LeadingAndTralingTextContext)
  const { wrongTextStartIndex } = useContext(WrongTextStartIndexContext)
  const rightText = wrongTextStartIndex > -1
    ? leadingText.slice(0, wrongTextStartIndex)
    : leadingText
  const wrongText = wrongTextStartIndex > -1
    ? leadingText.slice(wrongTextStartIndex)
    : ''
  const { trailingText } = useContext(LeadingAndTralingTextContext)

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
