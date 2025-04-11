import { create } from 'zustand'

type WrongKeyStore = {
  wrongKeyCount: number
  increaseWrongKeyCount: () => void
}

export const useWrongKeyCountStore = create<WrongKeyStore>()((set) => ({
  wrongKeyCount: 0,
  increaseWrongKeyCount: () =>
    set((state) => ({ wrongKeyCount: state.wrongKeyCount + 1 })),
}))
