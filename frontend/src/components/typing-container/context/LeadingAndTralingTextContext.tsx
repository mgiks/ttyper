import { createContext } from 'react'

const leadingAndTrailingState = {
  leadingText: '',
  setLeadingText: (_: string) => {},
  trailingText: '',
  setTrailingText: (_: string) => {},
}

export const LeadingAndTralingTextContext = createContext(
  leadingAndTrailingState,
)
