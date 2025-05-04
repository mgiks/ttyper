import { faker } from '@faker-js/faker/locale/uk'
import { create } from 'zustand'

function generateRandomName() {
  return faker.hacker.adjective() + ' ' + faker.hacker.noun()
}

function generateRandomPlayerId() {
  return faker.string.uuid()
}

type MultiplayerActions = {
  setRandomName: () => void
  setRandomPlayerId: () => void
  searchForMatch: () => void
  stopSearchingForMatch: () => void
}

type MultiplayerState = {
  name: string
  playerId: string
  isSearchingForMatch: boolean
  actions: MultiplayerActions
}

const useMultiplayerStore = create<MultiplayerState>()((set) => ({
  name: '',
  playerId: '',
  isSearchingForMatch: false,
  actions: {
    setRandomName: () => {
      set({ name: generateRandomName() })
    },
    setRandomPlayerId: () => {
      set({ playerId: generateRandomPlayerId() })
    },
    searchForMatch: () => {
      set({ isSearchingForMatch: true })
    },
    stopSearchingForMatch: () => {
      set({ isSearchingForMatch: false })
    },
  },
}))

export const useName = () => useMultiplayerStore((state) => state.name)
export const usePlayerId = () => useMultiplayerStore((state) => state.playerId)
export const useIsSearchingForMatch = () =>
  useMultiplayerStore((state) => state.isSearchingForMatch)
export const useMultiplayerActions = () =>
  useMultiplayerStore((state) => state.actions)
