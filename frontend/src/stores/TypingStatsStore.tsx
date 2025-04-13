import { create } from 'zustand'

type TypingStatsActions = {
  setTypingTime: (typingTime: number) => void
  increaseWrongKeyCount: () => void
  setCursorToMoved: () => void
  finishTyping: () => void
}

type TypingStatsState = {
  cursorMoved: boolean
  isDoneTyping: boolean
  typingTime: number
  wrongKeyCount: number
  actions: TypingStatsActions
}

const useTypingStatsStore = create<TypingStatsState>()(
  (set) => ({
    cursorMoved: false,
    isDoneTyping: false,
    typingTime: 0,
    wrongKeyCount: 0,
    actions: {
      setCursorToMoved: () => set({ cursorMoved: true }),
      finishTyping: () => set({ isDoneTyping: true }),
      setTypingTime: (typingTime: number) => set({ typingTime: typingTime }),
      increaseWrongKeyCount: () =>
        set((state) => ({ wrongKeyCount: state.wrongKeyCount + 1 })),
    },
  }),
)

export const useCursorMoved = () =>
  useTypingStatsStore((state) => state.cursorMoved)
export const useIsDoneTyping = () =>
  useTypingStatsStore((state) => state.isDoneTyping)
export const useTypingTime = () =>
  useTypingStatsStore((state) => state.typingTime)
export const useWrongKeyCount = () =>
  useTypingStatsStore((state) => state.wrongKeyCount)
export const useTypingStatsActions = () =>
  useTypingStatsStore((state) => state.actions)
