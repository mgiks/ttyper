import { createContext } from 'react'

const wrongTextStartIndexState = {
  wrongTextStartIndex: -1,
  setWrongTextStartIndex: (_: React.SetStateAction<number>) => {},
}

export const WrongTextStartIndexContext = createContext(
  wrongTextStartIndexState,
)
