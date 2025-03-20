import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import InactivityCurtain from './InactivityCurtain'
import { useRef, useState } from 'react'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { useOutsideClickAndKeyPress } from '../shared/hooks/useOutsideClickAndKeypress'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'

function TypingContainer() {
  // Not a boolean to allow refocusing when already focused
  const [isTypingContainerFocused, setIsTypingContainerFocused] = useState(1)
  const [leadingText, setLeadingText] = useState('')
  const [trailingText, setTrailingText] = useState('')

  function focusTypingContainer() {
    setIsTypingContainerFocused(isTypingContainerFocused + 1)
  }

  function unfocusTypingContainer() {
    setIsTypingContainerFocused(0)
  }

  const ref = useRef(null)

  const typingContainerRef = useOutsideClickAndKeyPress<HTMLDivElement>(
    unfocusTypingContainer,
    focusTypingContainer,
    ref,
  )

  return (
    <div
      ref={typingContainerRef}
      id='typing-container'
      onClick={focusTypingContainer}
    >
      <IsTypingContainerFocusedContext.Provider
        value={isTypingContainerFocused}
      >
        <InactivityCurtain />
        <LeadingAndTralingTextContext.Provider
          value={{
            leadingText,
            setLeadingText,
            trailingText,
            setTrailingText,
          }}
        >
          <TypingArea />
          <TextArea />
        </LeadingAndTralingTextContext.Provider>
      </IsTypingContainerFocusedContext.Provider>
    </div>
  )
}

export default TypingContainer
