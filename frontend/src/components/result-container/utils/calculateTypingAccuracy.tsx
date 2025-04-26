export function calculateTypingAccuracy(
  correctKeyPresses: number,
  errors: number,
) {
  const totalKepPresses = correctKeyPresses + errors
  return parseFloat((correctKeyPresses / totalKepPresses).toFixed(2))
}
