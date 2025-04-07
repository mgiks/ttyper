import { createContext } from 'react'

const trailingTextState = {
  trailingText: '',
  setTrailingText: (_: React.SetStateAction<string>) => {},
}

export const TrailingTextContext = createContext(trailingTextState)
