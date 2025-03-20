import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import InactivityCurtain from './InactivityCurtain'
import { useRef, useState } from 'react'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { useOutsideClickAndKeyPress } from '../shared/hooks/useOutsideClickAndKeypress'
import { TextContext } from './context/TextContext'

function TypingContainer() {
  // Not a boolean to allow refocusing when already focused
  const [isTypingContainerFocused, setIsTypingContainerFocused] = useState(1)
  const [text, setText] = useState('')

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
      <TextContext.Provider value={{ text, setText }}>
        <IsTypingContainerFocusedContext.Provider
          value={isTypingContainerFocused}
        >
          <InactivityCurtain />
          <TypingArea />
          <TextArea />
        </IsTypingContainerFocusedContext.Provider>
      </TextContext.Provider>
    </div>
  )
}

export default TypingContainer
