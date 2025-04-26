// A "word" is equivalent to 5 characters by convention
export function getWordCount(numberOfChars: number) {
  return Math.round(numberOfChars / 5)
}
