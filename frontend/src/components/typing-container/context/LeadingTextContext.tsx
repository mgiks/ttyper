import { createContext } from 'react'

const leadingTextState = {
  leadingText: '',
  setLeadingText: (_: React.SetStateAction<string>) => {},
}

export const LeadingTextContext = createContext(leadingTextState)
