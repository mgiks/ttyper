import { useName } from '../../stores/MultiplayerStore'
import './HeaderContainer.css'

function HeaderContainer() {
  const name = useName()
  return <div id='header-container'>{name}</div>
}

export default HeaderContainer
