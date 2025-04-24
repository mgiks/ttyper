export function calculateTypingAccuracy(textLength: number, errors: number) {
  const correctKeyPresses = textLength
  const totalKepPresses = textLength + errors
  return parseFloat((correctKeyPresses / totalKepPresses).toFixed(2))
}
