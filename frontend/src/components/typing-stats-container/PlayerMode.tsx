import { Modes, useTypingStatsActions } from '../../stores/TypingStatsStore'
import { playerModeToIcon } from './PlayerModeSwitcher'

function PlayerMode(
  { playerMode, setIsSwitcherVisible }: {
    playerMode: Modes
    setIsSwitcherVisible: React.Dispatch<React.SetStateAction<boolean>>
  },
) {
  const { setPlayerMode } = useTypingStatsActions()

  return (
    <li>
      <button
        onClick={() => (setPlayerMode(playerMode),
          setIsSwitcherVisible((visibilityValue) => !visibilityValue))}
      >
        <img
          className='player-mode-icons'
          src={playerModeToIcon.get(playerMode)}
        />{' '}
        {playerMode}
      </button>
    </li>
  )
}

export default PlayerMode
