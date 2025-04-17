export function toggleFocusOfTypingArea(
  typingContainerFocusCount: number,
  typingAreaRef: React.RefObject<HTMLTextAreaElement | null>,
) {
  const typingArea = typingAreaRef.current!
  typingContainerFocusCount > 0 ? typingArea.focus() : typingArea.blur()
}
