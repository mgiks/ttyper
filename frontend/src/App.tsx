import ResultContainer from './components/result-container/ResultContainer'
import TypingContainer from './components/typing-container/TypingContainer'
import TypingStatsContainer from './components/typing-stats-container/TypingStatsContainer'
import './App.css'
import {
  PlayerModes,
  useIsDoneTyping,
  usePlayerMode,
  useTypingStatsActions,
} from './stores/TypingStatsStore'
import { useEffect } from 'react'
import { useTextActions } from './stores/TextStore'
import { useMultiplayerActions } from './stores/MultiplayerStore'

function App() {
  const isDoneTyping = useIsDoneTyping()
  const playerMode = usePlayerMode()
  const { searchForPlayers, stopSearhingForPlayers } = useMultiplayerActions()
  const { increaseTextRefreshCount, resetCursorIndex } = useTextActions()
  const { resetTypingStats } = useTypingStatsActions()
  useEffect(() => {
    const removeTabDefaultFunctionality = (event: KeyboardEvent) => {
      event.key === 'Tab' && event.preventDefault()
    }
    window.onkeydown = removeTabDefaultFunctionality

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }
      if (playerMode === PlayerModes.Singleplayer) {
        increaseTextRefreshCount()
        resetTypingStats()
        resetCursorIndex()
        stopSearhingForPlayers()
      } else if (playerMode === PlayerModes.Multiplayer) {
        searchForPlayers()
      }
    }
    window.onkeyup = handleTab
  }, [playerMode])
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
