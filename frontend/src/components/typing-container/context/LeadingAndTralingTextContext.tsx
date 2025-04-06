import { createContext } from 'react'

const leadingAndTrailingTextState = {
  leadingText: '',
  setLeadingText: (_: React.SetStateAction<string>) => {},
  trailingText: '',
  setTrailingText: (_: React.SetStateAction<string>) => {},
}

export const LeadingAndTralingTextContext = createContext(
  leadingAndTrailingTextState,
)
