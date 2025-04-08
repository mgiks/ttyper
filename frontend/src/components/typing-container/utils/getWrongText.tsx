export function getWrongText(leadingText: string, wrongTextStartIndex: number) {
  return wrongTextStartIndex > -1 ? leadingText.slice(wrongTextStartIndex) : ''
}
