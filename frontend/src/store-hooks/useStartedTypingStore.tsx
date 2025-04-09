import { create } from 'zustand'

type StartedTypingStore = {
  isTyping: boolean
  setIsTypingToTrue: () => void
}

export const useStartedTypingStore = create<StartedTypingStore>()((set) => ({
  isTyping: false,
  setIsTypingToTrue: () => set({ isTyping: true }),
}))
