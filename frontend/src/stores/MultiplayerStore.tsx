import { create } from 'zustand'

type MultiplayerActions = {
  searchForPlayers: () => void
  stopSearhingForPlayers: () => void
}

type MultiplayerState = {
  isSearchingForMatch: boolean
  actions: MultiplayerActions
}

const useMultiplayerStore = create<MultiplayerState>()((set) => ({
  isSearchingForMatch: false,
  actions: {
    searchForPlayers: () => {
      set({ isSearchingForMatch: true })
    },
    stopSearhingForPlayers: () => {
      set({ isSearchingForMatch: false })
    },
  },
}))

export const useIsSearchingForMatch = () =>
  useMultiplayerStore((state) => state.isSearchingForMatch)
export const useMultiplayerActions = () =>
  useMultiplayerStore((state) => state.actions)
