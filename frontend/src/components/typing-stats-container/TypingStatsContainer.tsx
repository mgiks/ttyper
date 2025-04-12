import { useEffect, useRef, useState } from 'react'
import './TypingStatsContainer.css'
import { useStartedAndDoneTypingStore } from '../../store-hooks/useStartedTypingStore'
import { useTimeToTypeStore } from '../../store-hooks/useTimeToType'
import { useTextStore } from '../../store-hooks/useTextStore'
import { getActualWordCount } from './utils/getActualWordCount'

function TypingStatsContainer() {
  const [isStopWatchRunning, setIsStopWatchRunning] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const isTyping = useStartedAndDoneTypingStore((state) => state.isTyping)
  const isDoneTyping = useStartedAndDoneTypingStore((state) =>
    state.isDoneTyping
  )
  const text = useTextStore((state) => state.text)
  const rightText = useTextStore((state) => state.rightText)

  function startStopWatch() {
    setIsStopWatchRunning(true)
    setStartTime(Date.now())
  }

  function stopStopWatch() {
    setIsStopWatchRunning(false)
  }

  useEffect(() => {
    isTyping && startStopWatch()
  }, [isTyping])

  const setTimeToType = useTimeToTypeStore((state) => state.setTimeToType)
  useEffect(() => {
    if (isDoneTyping) {
      stopStopWatch()
      setTimeToType(secondsElapsed)
    }
  }, [isDoneTyping])

  const stopWarchRef = useRef<number>(undefined)

  useEffect(() => {
    if (isStopWatchRunning) {
      stopWarchRef.current = setInterval(() => {
        setSecondsElapsed(Math.round((Date.now() - startTime) / 1000))
      }, 1000)
    } else {
      clearTimeout(stopWarchRef.current)
    }
  }, [isStopWatchRunning])

  return (
    <div id='typing-stats-container'>
      <div>
        {secondsElapsed}
      </div>
      <div id='word-count'>
        {getActualWordCount(rightText) +
          (rightText.length === text.length ? 0 : -1)} /{' '}
        {getActualWordCount(text)}
      </div>
    </div>
  )
}

export default TypingStatsContainer
