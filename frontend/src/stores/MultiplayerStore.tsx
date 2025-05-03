import { faker } from '@faker-js/faker/locale/uk'
import { create } from 'zustand'

function generateRandomName() {
  return faker.hacker.adjective() + ' ' + faker.hacker.noun()
}

type MultiplayerActions = {
  setRandomName: () => void
  searchForPlayers: () => void
  stopSearhingForPlayers: () => void
}

type MultiplayerState = {
  name: string
  isSearchingForMatch: boolean
  actions: MultiplayerActions
}

const useMultiplayerStore = create<MultiplayerState>()((set) => ({
  name: '',
  isSearchingForMatch: false,
  actions: {
    setRandomName: () => {
      set({ name: generateRandomName() })
    },
    searchForPlayers: () => {
      set({ isSearchingForMatch: true })
    },
    stopSearhingForPlayers: () => {
      set({ isSearchingForMatch: false })
    },
  },
}))

export const useName = () => useMultiplayerStore((state) => state.name)
export const useIsSearchingForMatch = () =>
  useMultiplayerStore((state) => state.isSearchingForMatch)
export const useMultiplayerActions = () =>
  useMultiplayerStore((state) => state.actions)
