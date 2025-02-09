import "./TypingContainer.css"
import TextArea from "./TextArea"
import TypingArea from "./TypingArea"
import InactivityCurtain from "./InactivityCurtain"
import { useState } from "react"
import { IsTypingContainerFocusedContext } from "./context/IsTypingContainerFocusedContext"
import { useOutsideClick } from "../shared/hooks/useOutsideClick"
import { moonText } from "../../utils/example-texts"

const text = moonText

function TypingContainer() {
  // Not a boolean to allow refocusing when already focused
  const [isTypingContainerFocused, setIsTypingContainerFocused] = useState(1)

  function focusTypingContainer() {
    setIsTypingContainerFocused(isTypingContainerFocused + 1)
    console.log("focused")
  }
  
  function unfocusTypingContainer() {
    setIsTypingContainerFocused(0)
    console.log("unfocused")
  }

  const typingContainerRef = useOutsideClick<HTMLDivElement>(unfocusTypingContainer)

  return (
    <div
      ref={typingContainerRef}
      id="typing-container" 
      onClick={focusTypingContainer} 
    >
      <IsTypingContainerFocusedContext.Provider value={isTypingContainerFocused}>
        <InactivityCurtain />
        <TypingArea />
      </IsTypingContainerFocusedContext.Provider>
      <TextArea text={text} />
    </div>
  )
}

export default TypingContainer
