import { createContext } from 'react'

const textState = {
  text: '',
  setText: (_: string) => {},
}

export const TextContext = createContext(textState)
