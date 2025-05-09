import { useEffect, useState } from 'react'
import './InactivityCurtain.css'

function InactivityCurtain() {
  // 'typing-area' needed so that on the initial page load curtain doesn't show
  const [activeElementId, setActiveElementId] = useState('typing-area')

  useEffect(() => {
    const updateActiveElementId = () => {
      const activeElement = document.activeElement
      activeElement && setActiveElementId(activeElement.id)
    }
    document.addEventListener('click', updateActiveElementId)
    document.addEventListener('keypress', updateActiveElementId)
  }, [])

  const inactivityCurtain = (
    <div id='inactivity-curtain'>
      Click here or type any key to continue
    </div>
  )

  if (activeElementId === undefined) {
    return null
  }

  return activeElementId !== 'typing-area' ? inactivityCurtain : null
}

export default InactivityCurtain
