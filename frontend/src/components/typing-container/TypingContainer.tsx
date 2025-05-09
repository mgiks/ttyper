import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { focusElement } from './utils/focusElement'
import { useEffect, useRef } from 'react'
import { useIsDoneTyping } from '../../stores/TypingStatsStore'

function TypingContainer() {
  const typingContainerRef = useRef<HTMLDivElement>(null)
  const typingAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const isDoneTyping = useIsDoneTyping()

  function focusTypingArea() {
    typingAreaRef.current && focusElement(typingAreaRef.current)
  }

  useEffect(() => {
    document.addEventListener('keypress', () => {
      focusTypingArea()
    })
  }, [])

  useEffect(() => {
    focusTypingArea()
  }, [isDoneTyping])

  return (
    <div
      id='typing-container'
      ref={typingContainerRef}
      onClick={focusTypingArea}
    >
      <TypingArea ref={typingAreaRef} />
      <TextArea typingContainerRef={typingContainerRef} />
    </div>
  )
}

export default TypingContainer
