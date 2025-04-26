import './ResultContainer.css'
import {
  useCorrectText,
  useCursorIndex,
  useText,
  useTextRefreshCount,
} from '../../stores/TextStore'
import { getTypingSpeedAndAccuracy } from './utils/getTypingAccuracyAndWPM'
import { useEffect } from 'react'
import {
  useCorrectKeyCount,
  useIsDoneTyping,
  useTypingStatsActions,
  useTypingTime,
  useWrongKeyCount,
} from '../../stores/TypingStatsStore'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { secondsToArray } from './utils/secondsToArray'
import { useResultActions, useResultsPerSecond } from '../../stores/ResultStore'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
)

function ResultContainer() {
  const isDoneTyping = useIsDoneTyping()
  const typingTime = useTypingTime()
  const errors = useWrongKeyCount()
  const correctKeyPresses = useCorrectKeyCount()
  const textRefreshCount = useTextRefreshCount()
  const results = useResultsPerSecond()
  const cursorIndex = useCursorIndex()
  const { clearResults } = useResultActions()
  const { startTypingGame } = useTypingStatsActions()
  useEffect(() => {
    clearResults()
    startTypingGame()
  }, [textRefreshCount])

  const { GWPM, NWPM, typingAccuracy } = getTypingSpeedAndAccuracy(
    cursorIndex,
    typingTime,
    correctKeyPresses,
    errors,
  )

  return (
    <div
      id='result-container'
      className={isDoneTyping ? undefined : 'invisible'}
    >
      <div id='result-stats-container'>
        <div className='result-stats'>
          <label>GWPM:</label>
          {GWPM}
        </div>
        <div className='result-stats'>
          NWPM: {NWPM}
        </div>
        <div className='result-stats'>
          Typing accuracy: {typingAccuracy * 100}%
        </div>
        <div className='result-stats'>
          Time: {typingTime}
        </div>
        <div className='result-stats'>
          Errors: {errors}
        </div>
      </div>
      <div id='chart'>
        {results.length === typingTime &&
          (
            <Line
              data={{
                datasets: [{
                  label: 'WPM',
                  data: results.length === typingTime &&
                    results.map((result) => result.GWPM),
                  borderWidth: 1,
                }],
              }}
              options={{
                scales: {
                  y: { beginAtZero: true },
                  x: {
                    labels: secondsToArray(typingTime),
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              }}
            />
          )}
      </div>
    </div>
  )
}

export default ResultContainer
