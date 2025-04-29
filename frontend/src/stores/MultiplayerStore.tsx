import { create } from 'zustand'

type MultiplayerActions = {
  searchForPlayers: () => void
  stopSearhingForPlayers: () => void
}

type MultiplayerState = {
  isSearchingForPlayers: boolean
  actions: MultiplayerActions
}

const useMultiplayerStore = create<MultiplayerState>()((set) => ({
  isSearchingForPlayers: false,
  actions: {
    searchForPlayers: () => {
      set({ isSearchingForPlayers: true })
    },
    stopSearhingForPlayers: () => {
      set({ isSearchingForPlayers: false })
    },
  },
}))

export const useIsSearchingForPlayers = () =>
  useMultiplayerStore((state) => state.isSearchingForPlayers)
export const useMultiplayerActions = () =>
  useMultiplayerStore((state) => state.actions)
