import './ResultContainer.css'
import { useText, useTextRefreshCount } from '../../stores/TextStore'
import { getTypingSpeedAndAccuracy } from './utils/getTypingAccuracyAndWPM'
import { useEffect, useState } from 'react'
import {
  useIsDoneTyping,
  useTypingStatsActions,
  useTypingTime,
  useWrongKeyCount,
} from '../../stores/TypingStatsStore'

function ResultContainer() {
  const text = useText()
  const isDoneTyping = useIsDoneTyping()
  const typingTime = useTypingTime()
  const errors = useWrongKeyCount()
  const textRefreshCount = useTextRefreshCount()

  const { startTypingGame } = useTypingStatsActions()
  useEffect(() => {
    startTypingGame()
  }, [textRefreshCount])

  const [GWPM, setGWPM] = useState(0)
  const [NWPM, setNWPM] = useState(0)
  const [typingAccuracy, setTypingAccuracy] = useState(0)

  useEffect(() => {
    if (!isDoneTyping) return
    const { GWPM, NWPM, typingAccuracy } = getTypingSpeedAndAccuracy(
      text,
      typingTime,
      errors,
    )
    setGWPM(GWPM)
    setNWPM(NWPM)
    setTypingAccuracy(typingAccuracy)
  }, [isDoneTyping, typingTime])

  return (
    <div
      id='result-container'
      className={isDoneTyping ? undefined : 'invisible'}
    >
      GWPM: {GWPM}
      NWPM: {NWPM}
      Typing accuracy: {typingAccuracy}
    </div>
  )
}

export default ResultContainer
