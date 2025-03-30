export function trackTextForWrongKeys(text: string) {
  const trackedText = text.split('')
  let currentCharIndex = 0
  let wrongKeyIndex = -1

  function decreaseCurrentCharIndex() {
    currentCharIndex -= 1
  }

  function unsetWrongKeyIndex() {
    wrongKeyIndex = -1
  }

  return function (key: string) {
    if (key === 'Backspace') {
      currentCharIndex > 0 && decreaseCurrentCharIndex()
      currentCharIndex < wrongKeyIndex && unsetWrongKeyIndex()
      return
    }

    const currentChar = trackedText[currentCharIndex]
    const charIndex = currentCharIndex
    currentCharIndex += 1

    if (currentChar === key && charIndex <= wrongKeyIndex) {
      wrongKeyIndex = -1
    }
    if (key !== currentChar && wrongKeyIndex === -1) {
      wrongKeyIndex = charIndex
    }

    return wrongKeyIndex
  }
}
