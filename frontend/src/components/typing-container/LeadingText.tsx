import { useContext, useEffect, useState } from 'react'
import './LeadingText.css'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'
import { WrongTextStartIndexContext } from './context/WrongTextStartIndexContext'

function LeadingText() {
  const { leadingText } = useContext(LeadingAndTralingTextContext)
  const { wrongTextStartIndex } = useContext(
    WrongTextStartIndexContext,
  )
  const [rightText, setRightText] = useState('')
  const [wrongText, setWrongText] = useState('')

  useEffect(
    () => {
      if (wrongTextStartIndex > -1) {
        setRightText(leadingText.slice(0, wrongTextStartIndex))
        setWrongText(leadingText.slice(wrongTextStartIndex))
      } else {
        setRightText(leadingText)
      }
    },
    [leadingText],
  )

  return (
    <>
      <span id='right-text'>{rightText}</span>
      <span id='wrong-text'>{wrongText}</span>
    </>
  )
}

export default LeadingText
