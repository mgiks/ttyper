// A "word" is equivalent to 5 characters by convention
export function getWordCount(text: string) {
  return Math.round(text.length / 5)
}
