import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { useRef, useState } from 'react'
import { useOutsideClickAndKeyPress } from '../../hooks/useOutsideClickAndKeypress'

function TypingContainer() {
  // Not a boolean to allow refocusing when already focused
  const [isTypingContainerFocused, setIsTypingContainerFocused] = useState(1)
  function focusTypingContainer() {
    setIsTypingContainerFocused((isTypingContainerFocused) =>
      isTypingContainerFocused + 1
    )
  }
  function unfocusTypingContainer() {
    setIsTypingContainerFocused(0)
  }

  const ref = useRef<HTMLDivElement>(null)
  const typingContainerRef = useOutsideClickAndKeyPress<HTMLDivElement>(
    unfocusTypingContainer,
    focusTypingContainer,
    ref as React.RefObject<HTMLDivElement>,
  )

  return (
    <div
      ref={typingContainerRef}
      id='typing-container'
      onClick={focusTypingContainer}
    >
      <TypingArea isTypingContainerFocused={isTypingContainerFocused} />
      <TextArea isTypingContainerFocused={isTypingContainerFocused} />
    </div>
  )
}

export default TypingContainer
