import { createContext } from 'react'

const wrongTextStartIndexState = {
  wrongTextStartIndex: -1,
  setWrongTextStartIndex: (_: number) => {},
}

export const WrongTextStartIndexContext = createContext(
  wrongTextStartIndexState,
)
