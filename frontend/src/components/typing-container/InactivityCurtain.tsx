import "./InactivityCurtain.css"
import { useContext } from "react"
import { IsTypingContainerFocusedContext } from "./context/IsTypingContainerFocusedContext"

function InactivityCurtain() {
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)

  const inactivityCurtain = (
    <div id="inactivity-curtain">
      Click here or type any key to continue
    </div>
  )

  return !isTypingContainerFocused ? inactivityCurtain : null
}

export default InactivityCurtain
