import { useEffect, useRef, useState } from 'react'
import './TypingStatsContainer.css'
import { getActualWordCount } from './utils/getActualWordCount'
import { useCorrectText, useText } from '../../stores/TextStore'
import {
  useCursorMoved,
  useIsDoneTyping,
  useIsStopWatchRunning,
  useTimeElapsed,
  useTypingStatsActions,
} from '../../stores/TypingStatsStore'
import PlayerModeSwitcher from './PlayerModeSwitcher'

function TypingStatsContainer() {
  const cursorMoved = useCursorMoved()
  const isDoneTyping = useIsDoneTyping()
  const text = useText()
  const correctText = useCorrectText()
  const isStopwatchRunning = useIsStopWatchRunning()
  const timeElapsed = useTimeElapsed()
  const { setTypingTime, setTimeElapsed, startStopwatch, stopStopwatch } =
    useTypingStatsActions()
  const [typingStartTime, setTypingStartTime] = useState(0)

  function handleCursorMoving() {
    startStopwatch()
    setTypingStartTime(Date.now())
  }

  function handleFinishingTyping() {
    stopStopwatch()
    setTypingTime(timeElapsed)
  }

  useEffect(() => {
    cursorMoved && handleCursorMoving()
  }, [cursorMoved])

  useEffect(() => {
    isDoneTyping && handleFinishingTyping()
  }, [isDoneTyping])

  const stopWarchRef = useRef<number>(undefined)
  useEffect(() => {
    if (isStopwatchRunning) {
      stopWarchRef.current = setInterval(() => {
        setTimeElapsed(Math.round((Date.now() - typingStartTime) / 1000))
      }, 1000)
    } else {
      clearTimeout(stopWarchRef.current)
    }
  }, [isStopwatchRunning])

  return (
    <div id='typing-stats-container'>
      <PlayerModeSwitcher />
      <div id='stopwatch'>{timeElapsed}</div>
      <div id='word-count'>
        {getActualWordCount(correctText) +
          (correctText.length === text.length ? 0 : -1)} /{' '}
        {getActualWordCount(text)}
      </div>
    </div>
  )
}

export default TypingStatsContainer
