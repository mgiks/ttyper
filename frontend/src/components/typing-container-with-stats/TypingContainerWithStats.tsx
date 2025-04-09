import TypingContainer from '../typing-container/TypingContainer'
import TypingStatsContainer from '../typing-stats-container/TypingStatsContainer'
import './TypingContainerWithStats.css'

function TypingContainerWithStats() {
  return (
    <div id='typing-container-with-stats'>
      <TypingContainer />
      <TypingStatsContainer />
    </div>
  )
}

export default TypingContainerWithStats
