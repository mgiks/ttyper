import "./TextArea.css"

function TextArea(props: { text: string }) {
  return (
    <div id="typing-area">
      <span>{props.text}</span>
    </div>
  )
}

export default TextArea
