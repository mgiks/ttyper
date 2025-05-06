import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { focusElement } from './utils/focus'
import { useEffect, useRef } from 'react'

function TypingContainer() {
  const typingContainerRef = useRef<HTMLDivElement>(null)
  const typingAreaRef = useRef<HTMLTextAreaElement | null>(null)

  function focusTypingArea() {
    typingAreaRef.current && focusElement(typingAreaRef.current)
  }

  useEffect(() => {
    document.addEventListener('keypress', () => {
      focusTypingArea()
    })
  }, [])

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
