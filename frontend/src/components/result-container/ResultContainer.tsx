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
      <div id='result-wrapper'>
        <div id='stats'>
          <div id='wpm' className='result-stat'>
            <div className='stat-label'>
              wpm
            </div>
            <div className='stat-value'>
              {NWPM}
            </div>
          </div>
          <div id='accuracy' className='result-stat'>
            <div className='stat-label'>
              accuracy
            </div>
            <div className='stat-value'>
              {typingAccuracy * 100}%
            </div>
          </div>
        </div>
        <div id='additional-stats'>
          <div id='raw-wpm' className='result-stat'>
            <div className='small-stat-label'>
              raw wpm
            </div>
            <div className='small-stat-value'>
              {GWPM}
            </div>
          </div>
          <div id='time' className='result-stat'>
            <div className='small-stat-label'>
              time
            </div>
            <div className='small-stat-value'>
              {typingTime}s
            </div>
          </div>
          <div id='errors' className='result-stat'>
            <div className='small-stat-label'>
              errors
            </div>
            <div className='small-stat-value'>
              {errors}
            </div>
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
                  yAxisID: 'y1',
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  title: {
                    color: 'black',
                    text: 'Words Per Minute',
                    align: 'center',
                    display: true,
                  },
                  position: 'left',
                  min: 1,
                },
                y1: {
                  title: {
                    color: 'black',
                    text: 'Accuracy',
                    align: 'center',
                    display: true,
                  },
                  position: 'right',
                  beginAtZero: true,
                },
                x: {
                  labels: secondsToArray(finalTime),
                },
              },
              plugins: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultContainer
