import "./TypingContainer.css"
import TextArea from "./TextArea"
import TypingArea from "./TypingArea"
import InactivityCurtain from "./InactivityCurtain"
import { useRef, useState } from "react"
import { IsTypingContainerFocusedContext } from "./context/IsTypingContainerFocusedContext"
import { moonText } from "../shared/utils/example-texts"
import { useOutsideClickAndKeyPress } from "../shared/hooks/useOutsideClickAndKeypress"

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

  const ref = useRef(null)

  const typingContainerRef = useOutsideClickAndKeyPress<HTMLDivElement>(
    unfocusTypingContainer, 
    focusTypingContainer,
    ref,
  )

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
