import { useEffect, useRef, useState } from 'react'
import './TypingStatsContainer.css'
import { getActualWordCount } from './utils/getActualWordCount'
import { useCorrectText, useText } from '../../stores/TextStore'
import {
  useCursorMoved,
  useIsDoneTyping,
  useTypingStatsActions,
} from '../../stores/TypingStatsStore'

function TypingStatsContainer() {
  const cursorMoved = useCursorMoved()
  const isDoneTyping = useIsDoneTyping()
  const text = useText()
  const correctText = useCorrectText()
  const { setTypingTime } = useTypingStatsActions()
  const [startTime, setStartTime] = useState(0)
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isStopWatchRunning, setIsStopWatchRunning] = useState(false)

  function startStopWatch() {
    setIsStopWatchRunning(true)
    setStartTime(Date.now())
  }

  function stopStopWatch() {
    setIsStopWatchRunning(false)
    setTypingTime(secondsElapsed)
  }

  useEffect(() => {
    cursorMoved && startStopWatch()
  }, [cursorMoved])

  useEffect(() => {
    isDoneTyping && stopStopWatch()
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
        {getActualWordCount(correctText) +
          (correctText.length === text.length ? 0 : -1)} /{' '}
        {getActualWordCount(text)}
      </div>
    </div>
  )
}

export default TypingStatsContainer
