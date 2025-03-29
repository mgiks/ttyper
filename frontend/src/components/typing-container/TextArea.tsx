import { useContext } from 'react'
import Cursor from './Cursor'
import './TextArea.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import LeadingText from './LeadingText'

function TextArea() {
  const { trailingText } = useContext(
    LeadingAndTralingTextContext,
  )
  return (
    <div id='text-area'>
      <LeadingText />
      <Cursor />
      <span className='unselectable-text'>{trailingText}</span>
    </div>
  )
}

export default TextArea
