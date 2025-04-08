export function getRightText(leadingText: string, wrongTextStartIndex: number) {
  return wrongTextStartIndex > -1
    ? leadingText.slice(0, wrongTextStartIndex)
    : leadingText
}
