import ResultContainer from './components/result-container/ResultContainer'
import TypingContainer from './components/typing-container/TypingContainer'
import TypingStatsContainer from './components/typing-stats-container/TypingStatsContainer'
import './App.css'
import {
  useIsDoneTyping,
  useTypingStatsActions,
} from './stores/TypingStatsStore'
import { useEffect } from 'react'
import { useTextActions } from './stores/TextStore'

function App() {
  const isDoneTyping = useIsDoneTyping()
  const { increaseTextRefreshCount, resetCursorIndex } = useTextActions()
  const { resetTypingStats } = useTypingStatsActions()
  useEffect(() => {
    const removeTabDefaultFunctionality = (event: KeyboardEvent) => {
      event.key === 'Tab' && event.preventDefault()
    }
    window.onkeydown = removeTabDefaultFunctionality

    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        increaseTextRefreshCount()
        resetTypingStats()
        resetCursorIndex()
      }
    }
    window.onkeyup = handleTab
  })
  return (
    <>
      <div
        id='typing-container-with-stats'
        className={isDoneTyping ? 'invisible' : undefined}
      >
        <TypingContainer />
        <TypingStatsContainer />
      </div>
      <ResultContainer />
    </>
  )
}

export default App
