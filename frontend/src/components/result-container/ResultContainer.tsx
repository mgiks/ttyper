import './ResultContainer.css'
import { useCursorIndex, useTextRefreshCount } from '../../stores/TextStore'
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
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { secondsToArray } from './utils/secondsToArray'
import {
  Result,
  useResultActions,
  useResultsPerSecond,
} from '../../stores/ResultStore'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
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

  const result: Result = {
    GWPM: GWPM,
    NWPM: NWPM,
    typingAccuracy: typingAccuracy,
    time: typingTime + 1,
    errors: errors,
  }

  // Needed to prevent contradiction of graph data and final result
  const finalResults = [...results, result]
  const finalTime = typingTime + 1

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
        <Line
          data={{
            datasets: [
              {
                label: 'WPM',
                data: finalResults.map((result) => result.NWPM),
              },
              {
                label: 'Raw WPM',
                data: finalResults.map((result) => result.GWPM),
                borderWidth: 1,
              },
              {
                label: 'Accuracy',
                data: finalResults.map((
                  result,
                ) => (result.typingAccuracy * 100)),
              },
            ],
          }}
          options={{
            aspectRatio: 3,
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                labels: secondsToArray(finalTime),
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
      </div>
    </div>
  )
}

export default ResultContainer
