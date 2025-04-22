import ResultContainer from './components/result-container/ResultContainer'
import TypingContainer from './components/typing-container/TypingContainer'
import TypingStatsContainer from './components/typing-stats-container/TypingStatsContainer'
import './App.css'

function App() {
  return (
    <>
      <div id='typing-container-with-stats'>
        <TypingContainer />
        <TypingStatsContainer />
      </div>
      <ResultContainer />
    </>
  )
}

export default App
