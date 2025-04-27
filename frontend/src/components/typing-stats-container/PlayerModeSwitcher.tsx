import PlayerMode from './PlayerMode'
import singleplayerIcon from './icons/singleplayer-icon.svg'
import multiplayerIcon from './icons/multiplayer-icon.svg'
import privateRoomIcon from './icons/private-room-icon.svg'
import './PlayerModeSwitcher.css'
import { useState } from 'react'
import { Modes, usePlayerMode } from '../../stores/TypingStatsStore'

export const playerModeToIcon: Map<Modes, string> = new Map([
  [Modes.Singleplayer, singleplayerIcon],
  [Modes.Multiplayer, multiplayerIcon],
  [Modes.PrivateRoom, privateRoomIcon],
])

function PlayerModeSwitcher() {
  const playerMode = usePlayerMode()
  const [isSwitcherVisible, setIsSwitcherVisible] = useState(false)

  function toggleSwitcherVisibility() {
    setIsSwitcherVisible((visibilityValue) => !visibilityValue)
  }

  return (
    <div>
      <button onClick={() => toggleSwitcherVisibility()}>
        <img
          className='player-mode-icon'
          src={playerModeToIcon.get(playerMode)}
        />
      </button>
      <div
        id='player-mode-dropdown'
        className={isSwitcherVisible ? 'visible' : 'invisible'}
      >
        <ul>
          <PlayerMode
            playerMode={Modes.Multiplayer}
            setIsSwitcherVisible={setIsSwitcherVisible}
          />
          <PlayerMode
            playerMode={Modes.Singleplayer}
            setIsSwitcherVisible={setIsSwitcherVisible}
          />
          <PlayerMode
            playerMode={Modes.PrivateRoom}
            setIsSwitcherVisible={setIsSwitcherVisible}
          />
        </ul>
      </div>
    </div>
  )
}

export default PlayerModeSwitcher
