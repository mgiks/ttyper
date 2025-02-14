import "./TextArea.css"

function TextArea(props: {text: string}) {
  return (
    <div id="text-area">
      <span className="unselectable-text">{props.text}</span>
    </div>
  )
}

export default TextArea
