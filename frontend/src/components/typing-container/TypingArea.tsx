import { useContext, useEffect, useRef } from "react"
import "./TypingArea.css"
import { IsTypingContainerFocusedContext } from "./context/IsTypingContainerFocusedContext"

function TypingArea() {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)

  function toggleFocus() {
    const typingArea = typingAreaRef.current!

    isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
  }

  useEffect(toggleFocus, [isTypingContainerFocused])

  return <textarea ref={typingAreaRef} id="typing-area" autoFocus />
}

export default TypingArea
