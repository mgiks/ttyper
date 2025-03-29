import { createContext } from 'react'

const leadingAndTrailingTextState = {
  leadingText: '',
  setLeadingText: (_: string) => {},
  trailingText: '',
  setTrailingText: (_: string) => {},
}

export const LeadingAndTralingTextContext = createContext(
  leadingAndTrailingTextState,
)
