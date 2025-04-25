import { create } from 'zustand'

export enum Modes {
  Singleplayer = 'singleplayer',
  Multiplayer = 'multiplayer',
  PrivateRoom = 'private room',
}

type TypingStatsActions = {
  setTypingEndTime: (typingTime: number) => void
  increaseWrongKeyCount: () => void
  setCursorToMoved: () => void
  startTypingGame: () => void
  finishTypingGame: () => void
  setPlayerMode: (playerMode: Modes) => void
  resetTypingStats: () => void
}

type TypingStatsState = {
  cursorMoved: boolean
  isDoneTyping: boolean
  typingTime: number
  wrongKeyCount: number
  playerMode: Modes
  actions: TypingStatsActions
}

const TypingStatsInitialState: Omit<
  TypingStatsState,
  'actions' | 'playerMode'
> = {
  cursorMoved: false,
  isDoneTyping: false,
  typingTime: 0,
  wrongKeyCount: 0,
}

const useTypingStatsStore = create<TypingStatsState>()(
  (set) => ({
    ...TypingStatsInitialState,
    playerMode: Modes.Singleplayer,
    actions: {
      setCursorToMoved: () => set({ cursorMoved: true }),
      startTypingGame: () => set({ isDoneTyping: false }),
      finishTypingGame: () => set({ isDoneTyping: true }),
      setTypingEndTime: (typingTime: number) => set({ typingTime: typingTime }),
      increaseWrongKeyCount: () =>
        set((state) => ({ wrongKeyCount: state.wrongKeyCount + 1 })),
      setPlayerMode: (playerMode: Modes) => set({ playerMode: playerMode }),
      resetTypingStats: () => set(TypingStatsInitialState),
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
export const usePlayerMode = () =>
  useTypingStatsStore((state) => state.playerMode)
export const useTypingStatsActions = () =>
  useTypingStatsStore((state) => state.actions)
