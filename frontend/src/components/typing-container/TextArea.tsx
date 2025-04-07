import { useContext, useEffect, useRef } from 'react'
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
      <span id='cursor'></span>
      <span id='trailing-text' className='unselectable-text'>
        {trailingText}
      </span>
    </div>
  )
}

export default TextArea
