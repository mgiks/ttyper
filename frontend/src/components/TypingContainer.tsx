import "./TypingContainer.css"
import TextArea from "./TextArea"

function TypingContainer(props: { text: string }) {
  return (
    <div id="typing-container">
        <TextArea text={props.text} />
    </div>
  )
}

export default TypingContainer
