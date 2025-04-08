import React from 'react'

export function keepCursorInView(
  cursorRef: React.RefObject<HTMLSpanElement | null>,
  textAreaRef: React.RefObject<HTMLDivElement | null>,
) {
  const cursor = cursorRef.current
  const textArea = textAreaRef.current
  if (!cursor || !textArea) {
    return
  }
  const cursorYPosition = cursor.getBoundingClientRect().y
  const textAreaTopYCoor = textArea.getBoundingClientRect().y
  const textAreaHeight = textArea.getBoundingClientRect().height
  const textAreaBottomYCoor = textAreaTopYCoor + textAreaHeight
  const isCursorInsideTextArea = textAreaTopYCoor < cursorYPosition &&
    cursorYPosition < textAreaBottomYCoor

  if (!isCursorInsideTextArea) {
    cursor.scrollIntoView({ behavior: 'smooth' })
  }
}
