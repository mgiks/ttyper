// NWPM (Net Words Per Minute)
export function calculateNWPM(
  GWPM: number,
  errorCount: number,
  timeInSeconds: number,
) {
  return Math.round(GWPM - (errorCount / (timeInSeconds / 60)))
}
