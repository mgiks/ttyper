import { create } from 'zustand'

type StartedAndDoneTypingStore = {
  isTyping: boolean
  isDoneTyping: boolean
  setIsTypingToTrue: () => void
  setIsDoneTypingToTrue: () => void
}

export const useStartedAndDoneTypingStore = create<StartedAndDoneTypingStore>()(
  (set) => ({
    isTyping: false,
    isDoneTyping: false,
    setIsTypingToTrue: () => set({ isTyping: true }),
    setIsDoneTypingToTrue: () => set({ isDoneTyping: true }),
  }),
)
