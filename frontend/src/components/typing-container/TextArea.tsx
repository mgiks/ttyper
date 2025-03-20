import { useContext } from 'react'
import Cursor from './Cursor'
import './TextArea.css'
import { TextContext } from './context/TextContext'

function TextArea() {
  const { text } = useContext(TextContext)
  return (
    <div id='text-area'>
      <Cursor />
      <span className='unselectable-text'>{text}</span>
    </div>
  )
}

export default TextArea
