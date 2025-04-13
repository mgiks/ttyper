import { calculateGWPM } from './calculateGWPM'
import { calculateNWPM } from './calculateNWPM'
import { calculateTypingAccuracy } from './calculateTypingAccuracy'
import { getWordCount } from './getWordCount'

export function getTypingSpeedAndAccuracy(
  text: string,
  typingTime: number,
  errors: number,
) {
  const wordCount = getWordCount(text)
  const GWPM = calculateGWPM(wordCount, typingTime)
  const NWPM = calculateNWPM(GWPM, errors, typingTime)
  const typingAccuracy = calculateTypingAccuracy(NWPM, GWPM)

  return {
    GWPM: GWPM,
    NWPM: NWPM,
    typingAccuracy: typingAccuracy,
  }
}
