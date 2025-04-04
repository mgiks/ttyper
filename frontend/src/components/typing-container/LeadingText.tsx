import { useContext } from 'react'
import './LeadingText.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'

function LeadingText() {
  const { leadingText } = useContext(LeadingAndTralingTextContext)
  const { wrongTextStartIndex } = useContext(
    WrongTextStartIndexContext,
  )

  const rightText = wrongTextStartIndex > -1
    ? leadingText.slice(0, wrongTextStartIndex)
    : leadingText
  const wrongText = wrongTextStartIndex > -1
    ? leadingText.slice(wrongTextStartIndex)
    : ''

  return (
    <>
      <span id='right-text' className='unselectable-text'>{rightText}</span>
      <span id='wrong-text' className='unselectable-text'>{wrongText}</span>
    </>
  )
}

export default LeadingText
