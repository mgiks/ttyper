import { ChangeEvent, useState } from "react"
import "./TypingArea.css"

function TypingArea() {
    const [value, setValue] = useState("")

    function setInput(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
        console.log("input catched")
    }

    return <textarea id="typing-area" onInput={setInput} autoFocus />
}

export default TypingArea
