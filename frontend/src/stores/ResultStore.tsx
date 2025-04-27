import { create } from 'zustand'

type ResultActions = {
  addResult: (result: Result) => void
  clearResults: () => void
}

export type Result = {
  GWPM: number
  NWPM: number
  typingAccuracy: number
  time: number
  errors: number
}

type ResultState = {
  resultsPerSecond: Result[]
  actions: ResultActions
}

const useResultStore = create<ResultState>()((set) => ({
  resultsPerSecond: [],
  actions: {
    addResult: (result: Result) =>
      set((state) => ({
        resultsPerSecond: [...state.resultsPerSecond, result],
      })),
    clearResults: () => set({ resultsPerSecond: [] }),
  },
}))

export const useResultsPerSecond = () =>
  useResultStore((state) => state.resultsPerSecond)
export const useResultActions = () => useResultStore((state) => state.actions)
