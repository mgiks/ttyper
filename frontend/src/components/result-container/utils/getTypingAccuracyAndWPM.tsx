import { calculateGWPM } from './calculateGWPM'
import { calculateNWPM } from './calculateNWPM'
import { calculateTypingAccuracy } from './calculateTypingAccuracy'
import { getWordCount } from './getWordCount'

export function getTypingSpeedAndAccuracy(
  text: string,
  typingTimeInSeconds: number,
  errors: number,
) {
  const typingTimeInMinutes = typingTimeInSeconds / 60
  const wordCount = getWordCount(text)
  const typingAccuracy = calculateTypingAccuracy(text.length, errors)
  const GWPM = calculateGWPM(wordCount, typingTimeInMinutes)
  const NWPM = calculateNWPM(GWPM, typingAccuracy)

  return {
    GWPM: GWPM,
    NWPM: NWPM,
    typingAccuracy: typingAccuracy,
  }
}
