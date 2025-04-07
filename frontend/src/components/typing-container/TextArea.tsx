import { useContext, useEffect, useRef } from 'react'
import './TextArea.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import LeadingText from './LeadingText'

function TextArea() {
  const { trailingText } = useContext(
    LeadingAndTralingTextContext,
  )
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

  return (
    <div id='text-area' ref={textAreaRef}>
      <LeadingText />
      <span id='cursor' ref={cursorRef}></span>
      <span id='trailing-text' className='unselectable-text'>
        {trailingText}
      </span>
    </div>
  )
}

export default TextArea
