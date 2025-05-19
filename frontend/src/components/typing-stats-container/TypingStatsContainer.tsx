import { useEffect, useRef, useState } from 'react'
import './TypingStatsContainer.css'
import { useCorrectText, useCursorIndex, useText } from '../../stores/TextStore'
import {
  useCorrectKeyCount,
  useCursorMoved,
  useIsDoneTyping,
  useIsStopWatchRunning,
  useTimeElapsed,
  useTypingStatsActions,
  useWrongKeyCount,
} from '../../stores/TypingStatsStore'
import PlayerModeSwitcher from './PlayerModeSwitcher'
import { Result, useResultActions } from '../../stores/ResultStore'
import { calculateTypingAccuracyAndWPM } from '../result-container/utils/calculateTypingAccuracyAndWPM'
import { calculateWordCount } from './utils/calculateWordCount'

function TypingStatsContainer() {
  const cursorMoved = useCursorMoved()
  const isDoneTyping = useIsDoneTyping()
  const text = useText()
  const errors = useWrongKeyCount()
  const correctText = useCorrectText()
  const correctKeyPresses = useCorrectKeyCount()
  const isStopwatchRunning = useIsStopWatchRunning()
  const timeElapsed = useTimeElapsed()
  const cursorIndex = useCursorIndex()
  const { addResult } = useResultActions()
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

  const stopWarchRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    if (isStopwatchRunning) {
      stopWarchRef.current = setInterval(() => {
        setTimeElapsed(Math.round((Date.now() - typingStartTime) / 1000))
      }, 1000)
    } else {
      clearTimeout(stopWarchRef.current)
    }
  }, [isStopwatchRunning])

  useEffect(() => {
    if (timeElapsed) {
      const { GWPM, NWPM, typingAccuracy } = calculateTypingAccuracyAndWPM(
        cursorIndex,
        timeElapsed,
        correctKeyPresses,
        errors,
      )
      const result: Result = {
        GWPM: GWPM,
        NWPM: NWPM,
        typingAccuracy: typingAccuracy,
        time: timeElapsed,
        errors: errors,
      }
      addResult(result)
    }
  }, [timeElapsed, isDoneTyping])

  return (
    <div id='typing-stats-container'>
      <PlayerModeSwitcher />
      <div id='stopwatch'>{timeElapsed}</div>
      <div id='word-count'>
        {calculateWordCount(correctText) +
          (correctText.length === text.length ? 0 : -1)} /{' '}
        {calculateWordCount(text)}
      </div>
    </div>
  )
}

export default TypingStatsContainer
