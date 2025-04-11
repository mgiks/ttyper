// GWPM (Gross Words Per Minute)
export function calculateGWPM(wordCount: number, timeInSeconds: number) {
  return Math.round(wordCount / (timeInSeconds / 60))
}
