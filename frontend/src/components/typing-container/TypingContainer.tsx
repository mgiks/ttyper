import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { useEffect, useRef, useState } from 'react'
import { useOutsideClickAndKeyPress } from '../../hooks/useOutsideClickAndKeypress'

function TypingContainer() {
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

  const [textRefreshCount, setTextRefreshCount] = useState(0)
  useEffect(() => {
    const removeTabDefaultFunctionality = (event: KeyboardEvent) => {
      event.key === 'Tab' && event.preventDefault()
    }
    window.addEventListener(
      'keydown',
      removeTabDefaultFunctionality,
    )

    const increaseTextRefreshCount = (event: KeyboardEvent) => {
      event.key === 'Tab' &&
        setTextRefreshCount((prevTextRefreshCount) => prevTextRefreshCount + 1)
    }
    typingContainerRef.current?.addEventListener(
      'keyup',
      increaseTextRefreshCount,
    )

    return () => {
      window.removeEventListener('keydown', removeTabDefaultFunctionality)
      typingContainerRef.current?.removeEventListener(
        'keyup',
        increaseTextRefreshCount,
      )
    }
  })

  return (
    <div
      ref={typingContainerRef}
      id='typing-container'
      onClick={focusTypingContainer}
    >
      <TypingArea
        typingContainerFocusCount={focusCount}
        textRefreshCount={textRefreshCount}
      />
      <TextArea
        typingContainerRef={typingContainerRef}
        typingContainerFocusCount={focusCount}
      />
    </div>
  )
}

export default TypingContainer
