import { useContext } from 'react'
import Cursor from './Cursor'
import './TextArea.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'

function TextArea() {
  const { leadingText, trailingText } = useContext(LeadingAndTralingTextContext)
  return (
    <div id='text-area'>
      <span className='unselectable-text'>{leadingText}</span>
      <Cursor />
      <span className='unselectable-text'>{trailingText}</span>
    </div>
  )
}

export default TextArea
