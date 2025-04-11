import { create } from 'zustand'

type TimeToTypeStore = {
  timeToType: number
  setTimeToType: (timeToType: number) => void
}

export const useTimeToTypeStore = create<TimeToTypeStore>()((set) => ({
  timeToType: -1,
  setTimeToType: (timeToType) => set({ timeToType: timeToType }),
}))
