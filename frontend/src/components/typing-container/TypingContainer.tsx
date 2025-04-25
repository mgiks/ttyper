import './TypingContainer.css'
import TextArea from './TextArea'
import TypingArea from './TypingArea'
import { useEffect, useRef, useState } from 'react'
import { useOutsideClickAndKeyPress } from '../../hooks/useOutsideClickAndKeypress'
import { useTextActions } from '../../stores/TextStore'
import { useTypingStatsActions } from '../../stores/TypingStatsStore'

function TypingContainer() {
  const { increaseTextRefreshCount, resetCursorIndex } = useTextActions()
  const { resetTypingStats } = useTypingStatsActions()

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

  useEffect(() => {
    const removeTabDefaultFunctionality = (event: KeyboardEvent) => {
      event.key === 'Tab' && event.preventDefault()
    }
    window.addEventListener(
      'keydown',
      removeTabDefaultFunctionality,
    )

    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        increaseTextRefreshCount()
        resetTypingStats()
        resetCursorIndex()
      }
    }
    const typingContainer = typingContainerRef.current
    if (typingContainer) {
      typingContainer.onkeyup = handleTab
    }

    return () => {
      window.removeEventListener('keydown', removeTabDefaultFunctionality)
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
      />
      <TextArea
        typingContainerRef={typingContainerRef}
        typingContainerFocusCount={focusCount}
      />
    </div>
  )
}

export default TypingContainer
