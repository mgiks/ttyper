import { useEffect, useState } from 'react'
import { useStartedAndDoneTypingStore } from '../../store-hooks/useStartedTypingStore'
import { useTextStore } from '../../store-hooks/useTextStore'
import './ResultContainer.css'
import { calculateGWPM } from './utils/calculateGWPM'
import { calculateNWPM } from './utils/calculateNWPM'
import { calculateTypingAccuracy } from './utils/calculateTypingAccuracy'
import { getWordCount } from './utils/getWordCount'
import { useWrongKeyCountStore } from '../../store-hooks/useWrongKeyCountStore'
import { useTimeToTypeStore } from '../../store-hooks/useTimeToType'

function ResultContainer() {
  const text = useTextStore((state) => state.text)
  const [GWPM, setGWPM] = useState(0)
  const [NWPM, setNWPM] = useState(0)
  const [typingAccuracy, setTypingAccuracy] = useState(0)
  const isDoneTyping = useStartedAndDoneTypingStore((state) =>
    state.isDoneTyping
  )
  const errors = useWrongKeyCountStore((state) => state.wrongKeyCount)
  const timeToType = useTimeToTypeStore((state) => state.timeToType)

  useEffect(() => {
    if (isDoneTyping && timeToType !== -1) {
      const wordCount = getWordCount(text)
      const GWPM = calculateGWPM(wordCount, timeToType)
      const NWPM = calculateNWPM(GWPM, errors, timeToType)
      const typingAccuracy = calculateTypingAccuracy(NWPM, GWPM)
      setGWPM(GWPM)
      setNWPM(NWPM)
      setTypingAccuracy(typingAccuracy)
    }
  }, [errors, timeToType, isDoneTyping])

  return (
    <div id='result-container' className={isDoneTyping ? 'visible' : undefined}>
      GWPM: {GWPM}
      NWPM: {NWPM}
      Typing accuracy: {typingAccuracy}
    </div>
  )
}

export default ResultContainer
