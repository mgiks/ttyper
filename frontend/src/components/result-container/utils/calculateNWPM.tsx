// NWPM (Net Words Per Minute)
export function calculateNWPM(
  GWPM: number,
  accuracy: number,
) {
  return Math.round(GWPM * accuracy)
}
