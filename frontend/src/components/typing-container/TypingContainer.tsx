import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import InactivityCurtain from './InactivityCurtain'
import { useRef, useState } from 'react'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { useOutsideClickAndKeyPress } from '../../hooks/useOutsideClickAndKeypress'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'
import { LeadingTextContext } from './context/LeadingTextContext'
import { TrailingTextContext } from './context/TrailingTextContext'

function TypingContainer() {
  // Not a boolean to allow refocusing when already focused
  const [isTypingContainerFocused, setIsTypingContainerFocused] = useState(1)
  const [leadingText, setLeadingText] = useState('')
  const [trailingText, setTrailingText] = useState('')
  const [wrongTextStartIndex, setWrongTextStartIndex] = useState(0)

  function focusTypingContainer() {
    setIsTypingContainerFocused(isTypingContainerFocused + 1)
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
      <IsTypingContainerFocusedContext.Provider
        value={isTypingContainerFocused}
      >
        <InactivityCurtain />
        <LeadingTextContext.Provider value={{ leadingText, setLeadingText }}>
          <TrailingTextContext.Provider
            value={{ trailingText, setTrailingText }}
          >
            <WrongTextStartIndexContext.Provider
              value={{
                wrongTextStartIndex,
                setWrongTextStartIndex,
              }}
            >
              <TypingArea />
              <TextArea />
            </WrongTextStartIndexContext.Provider>
          </TrailingTextContext.Provider>
        </LeadingTextContext.Provider>
      </IsTypingContainerFocusedContext.Provider>
    </div>
  )
}

export default TypingContainer
