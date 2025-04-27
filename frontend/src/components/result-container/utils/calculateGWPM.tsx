// GWPM (Gross Words Per Minute)
export function calculateGWPM(wordCount: number, timeInMinutes: number) {
  return Math.round(wordCount / timeInMinutes)
}
