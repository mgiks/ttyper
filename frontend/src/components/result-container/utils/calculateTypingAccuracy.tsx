export function calculateTypingAccuracy(NWPM: number, GWPM: number) {
  return Math.round(NWPM / GWPM * 100)
}
