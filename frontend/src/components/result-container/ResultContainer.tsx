import './ResultContainer.css'
import { useText, useTextRefreshCount } from '../../stores/TextStore'
import { getTypingSpeedAndAccuracy } from './utils/getTypingAccuracyAndWPM'
import { useEffect } from 'react'
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

  const { GWPM, NWPM, typingAccuracy } = getTypingSpeedAndAccuracy(
    text,
    typingTime,
    errors,
  )

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
