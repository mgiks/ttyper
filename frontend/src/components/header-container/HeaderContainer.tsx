import { usePlayerName } from '../../stores/MultiplayerStore'
import './HeaderContainer.css'

function HeaderContainer() {
  const playerName = usePlayerName()
  return <div id='header-container'>{playerName}</div>
}

export default HeaderContainer
