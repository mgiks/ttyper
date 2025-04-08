export function toggleFocusOfTypingArea(
  isTypingContainerFocused: number,
  typingAreaRef: React.RefObject<HTMLTextAreaElement | null>,
) {
  const typingArea = typingAreaRef.current!
  isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
}
