import './ResultContainer.css'
import { useText } from '../../stores/TextStore'
import { getTypingSpeedAndAccuracy } from './utils/getTypingAccuracyAndWPM'
import {
  useIsDoneTyping,
  useTypingTime,
  useWrongKeyCount,
} from '../../stores/TypingStatsStore'

function ResultContainer() {
  const text = useText()
  const isDoneTyping = useIsDoneTyping()
  const typingTime = useTypingTime()
  const errors = useWrongKeyCount()
  const { GWPM, NWPM, typingAccuracy } = getTypingSpeedAndAccuracy(
    text,
    typingTime,
    errors,
  )

  return (
    <div
      id='result-container'
      className={isDoneTyping ? 'visible' : undefined}
    >
      GWPM: {GWPM}
      NWPM: {NWPM}
      Typing accuracy: {typingAccuracy}
    </div>
  )
}

export default ResultContainer
