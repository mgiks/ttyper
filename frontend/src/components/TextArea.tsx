import "./TextArea.css"

function TextArea(props: { text: string }) {
  return (
    <div id="text-area">
      <span>{props.text}</span>
    </div>
  )
}

export default TextArea
