export function trackText(text: string) {
  const trackedText = text.split('')
  let currentCharIndex = 0

  return function (key: string) {
    const currentChar = trackedText[currentCharIndex]
    const nextCharIndex = currentCharIndex + 1
    currentCharIndex = nextCharIndex

    if (key != currentChar) {
      return false
    }
    return true
  }
}
