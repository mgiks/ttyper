export function trackText(text: string) {
  const trackedText = text.split('')
  let currentCharIndex = 0
  let wrongKeyIndex = -1

  return function (key: string) {
    if (key === 'Backspace') {
      currentCharIndex > 0 ? currentCharIndex -= 1 : wrongKeyIndex = -1
      return
    }
    const currentChar = trackedText[currentCharIndex]
    const charIndex = currentCharIndex
    currentCharIndex += 1

    if (currentChar === key && charIndex <= wrongKeyIndex) {
      wrongKeyIndex = -1
      return true
    }

    if (wrongKeyIndex !== -1) {
      return false
    }

    if (key !== currentChar) {
      wrongKeyIndex = charIndex
      return false
    }

    return true
  }
}
