import { create } from 'zustand'

export enum PlayerModes {
  Singleplayer = 'singleplayer',
  Multiplayer = 'multiplayer',
  PrivateRoom = 'private room',
}

type TypingStatsActions = {
  setTypingTime: (typingTime: number) => void
  setTimeElapsed: (timeElapsed: number) => void
  increaseWrongKeyCount: () => void
  increaseCorrectKeyCount: () => void
  setCursorToMoved: () => void
  startTypingGame: () => void
  finishTypingGame: () => void
  startStopwatch: () => void
  stopStopwatch: () => void
  setPlayerMode: (playerMode: PlayerModes) => void
  resetTypingStats: () => void
}

type TypingStatsState = {
  cursorMoved: boolean
  isDoneTyping: boolean
  isStopWatchRunning: boolean
  typingTime: number
  timeElapsed: number
  wrongKeyCount: number
  correctKeyCount: number
  playerMode: PlayerModes
  actions: TypingStatsActions
}

const TypingStatsInitialState: Omit<
  TypingStatsState,
  'actions' | 'playerMode'
> = {
  cursorMoved: false,
  isDoneTyping: false,
  isStopWatchRunning: false,
  typingTime: 0,
  timeElapsed: 0,
  wrongKeyCount: 0,
  correctKeyCount: 0,
}

const useTypingStatsStore = create<TypingStatsState>()(
  (set) => ({
    ...TypingStatsInitialState,
    playerMode: PlayerModes.Singleplayer,
    actions: {
      setCursorToMoved: () => set({ cursorMoved: true }),
      startTypingGame: () => set({ isDoneTyping: false }),
      finishTypingGame: () => set({ isDoneTyping: true }),
      startStopwatch: () => set({ isStopWatchRunning: true }),
      stopStopwatch: () => set({ isStopWatchRunning: false }),
      setTypingTime: (typingTime: number) => set({ typingTime: typingTime }),
      setTimeElapsed: (timeElapsed: number) =>
        set({ timeElapsed: timeElapsed }),
      increaseWrongKeyCount: () =>
        set((state) => ({ wrongKeyCount: state.wrongKeyCount + 1 })),
      increaseCorrectKeyCount: () =>
        set((state) => ({ correctKeyCount: state.correctKeyCount + 1 })),
      setPlayerMode: (playerMode: PlayerModes) =>
        set({ playerMode: playerMode }),
      resetTypingStats: () => set(TypingStatsInitialState),
    },
  }),
)

export const useCursorMoved = () =>
  useTypingStatsStore((state) => state.cursorMoved)
export const useIsDoneTyping = () =>
  useTypingStatsStore((state) => state.isDoneTyping)
export const useIsStopWatchRunning = () =>
  useTypingStatsStore((state) => state.isStopWatchRunning)
export const useTypingTime = () =>
  useTypingStatsStore((state) => state.typingTime)
export const useTimeElapsed = () =>
  useTypingStatsStore((state) => state.timeElapsed)
export const useWrongKeyCount = () =>
  useTypingStatsStore((state) => state.wrongKeyCount)
export const useCorrectKeyCount = () =>
  useTypingStatsStore((state) => state.correctKeyCount)
export const usePlayerMode = () =>
  useTypingStatsStore((state) => state.playerMode)
export const useTypingStatsActions = () =>
  useTypingStatsStore((state) => state.actions)
