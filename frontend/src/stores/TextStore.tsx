import { create } from 'zustand'

type TextActions = {
  setText: (text: string) => void
  setCorrectText: (rightText: string) => void
  setTextBeforeCursor: (textBeforeCursor: string) => void
  setTextAfterCursor: (textAfterCursor: string) => void
  setWrongTextStartIndex: (wrongTextStartIndex: number) => void
  setCursorIndex: (key: string) => void
  resetCursorIndex: () => void
  increaseTextRefreshCount: () => void
}

type TextState = {
  text: string
  correctText: string
  textBeforeCursor: string
  textAfterCursor: string
  wrongTextStartIndex: number
  cursorIndex: number
  textRefreshCount: number
  actions: TextActions
}

const useTextStore = create<TextState>()((set) => ({
  text: '',
  correctText: '',
  textBeforeCursor: '',
  textAfterCursor: '',
  wrongTextStartIndex: -1,
  textRefreshCount: 0,
  cursorIndex: 0,
  actions: {
    setText: (text: string) => set({ text: text }),
    setCorrectText: (correctText: string) => set({ correctText: correctText }),
    setTextBeforeCursor: (textBeforeCursor: string) =>
      set({ textBeforeCursor: textBeforeCursor }),
    setTextAfterCursor: (textAfterCursor: string) =>
      set({ textAfterCursor: textAfterCursor }),
    setWrongTextStartIndex: (wrongTextStartIndex: number) =>
      set({ wrongTextStartIndex: wrongTextStartIndex }),
    setCursorIndex: (key: string) =>
      set((state) => ({
        cursorIndex: state.cursorIndex + (key === 'Backspace' ? -1 : 1),
      })),
    resetCursorIndex: () => set({ cursorIndex: 0 }),
    increaseTextRefreshCount: () =>
      set((state) => ({ textRefreshCount: state.textRefreshCount + 1 })),
  },
}))

export const useText = () => useTextStore((state) => state.text)
export const useCorrectText = () => useTextStore((state) => state.correctText)
export const useTextBeforeCursor = () =>
  useTextStore((state) => state.textBeforeCursor)
export const useTextAfterCursor = () =>
  useTextStore((state) => state.textAfterCursor)
export const useWrongTextStartIndex = () =>
  useTextStore((state) => state.wrongTextStartIndex)
export const useCursorIndex = () => useTextStore((state) => state.cursorIndex)
export const useTextRefreshCount = () =>
  useTextStore((state) => state.textRefreshCount)
export const useTextActions = () => useTextStore((state) => state.actions)
