import "./TypingContainer.css"
import TextArea from "./TextArea"
import TypingArea from "./TypingArea"

function TypingContainer(props: { text: string }) {
  function printToConsole() {
    console.log("typing container was focused")
  }

  return (
    <div id="typing-container" onClick={printToConsole}>
        <TypingArea />
        <TextArea text={props.text} />
    </div>
  )
}

export default TypingContainer
