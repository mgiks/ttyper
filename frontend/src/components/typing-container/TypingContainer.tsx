import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { useRef, useState } from 'react'
import { useOutsideClickAndKeyPress } from '../../hooks/useOutsideClickAndKeypress'
import { useIsDoneTyping } from '../../stores/TypingStatsStore'

function TypingContainer() {
  const isDoneTyping = useIsDoneTyping()
  // Not a boolean to prevent unfocusing typing area
  // when clicking on typing container
  const [focusCount, setFocusCount] = useState(1)

  function focusTypingContainer() {
    setFocusCount((prevFocusCount) => prevFocusCount + 1)
  }
  function unfocusTypingContainer() {
    setFocusCount(0)
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
      className={isDoneTyping ? 'invisible' : undefined}
      onClick={focusTypingContainer}
    >
      <TypingArea
        typingContainerFocusCount={focusCount}
      />
      <TextArea
        typingContainerRef={typingContainerRef}
        typingContainerFocusCount={focusCount}
      />
    </div>
  )
}

export default TypingContainer
