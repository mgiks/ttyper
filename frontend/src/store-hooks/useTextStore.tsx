import { create } from 'zustand'

type TextStore = {
  text: string
  setText: (text: string) => void
}

export const useTextStore = create<TextStore>()((set) => ({
  text: '',
  setText: (text: string) => set({ text: text }),
}))
