import { create } from 'zustand'

type TextActions = {
  setText: (text: string) => void
  setCorrectText: (rightText: string) => void
  setTextBeforeCursor: (textBeforeCursor: string) => void
  setTextAfterCursor: (textAfterCursor: string) => void
  setWrongTextStartIndex: (wrongTextStartIndex: number) => void
}

type TextState = {
  text: string
  correctText: string
  textBeforeCursor: string
  textAfterCursor: string
  wrongTextStartIndex: number
  actions: TextActions
}

const useTextStore = create<TextState>()((set) => ({
  text: '',
  correctText: '',
  textBeforeCursor: '',
  textAfterCursor: '',
  wrongTextStartIndex: -1,
  actions: {
    setText: (text: string) => set({ text: text }),
    setCorrectText: (correctText: string) => set({ correctText: correctText }),
    setTextBeforeCursor: (textBeforeCursor: string) =>
      set({ textBeforeCursor: textBeforeCursor }),
    setTextAfterCursor: (textAfterCursor: string) =>
      set({ textAfterCursor: textAfterCursor }),
    setWrongTextStartIndex: (wrongTextStartIndex: number) =>
      set({ wrongTextStartIndex: wrongTextStartIndex }),
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
export const useTextActions = () => useTextStore((state) => state.actions)
