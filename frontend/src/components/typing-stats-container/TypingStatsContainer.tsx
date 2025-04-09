import { useEffect, useState } from 'react'
import './TypingStatsContainer.css'
import { useStartedTypingStore } from '../../store-hooks/useStartedTypingStore'

function TypingStatsContainer() {
  const [isStopWatchRunning, setIsStopWatchRunning] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const isTyping = useStartedTypingStore((state) => state.isTyping)

  function startStopWatch() {
    setIsStopWatchRunning(true)
    setStartTime(Date.now())
  }

  useEffect(() => {
    isTyping && startStopWatch()
  }, [isTyping])

  useEffect(() => {
    if (isStopWatchRunning) {
      setInterval(() => {
        setSecondsElapsed(Math.round((Date.now() - startTime) / 1000))
      }, 1000)
    }
  }, [isStopWatchRunning])

  return (
    <div id='typing-stats-container'>
      {secondsElapsed}
    </div>
  )
}

export default TypingStatsContainer
