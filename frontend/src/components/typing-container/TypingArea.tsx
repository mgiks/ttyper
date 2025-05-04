import { useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { trackTextForWrongKeys } from './utils/trackTextForWrongKeys'
import { Message, PlayerInfoMessage, RandomTextMessage } from './dtos/message'
import { toggleFocusOfTypingArea } from './utils/toggleFocusOfTypingArea'
import { isControlKey } from './utils/isControlKey'
import {
  useCursorIndex,
  useTextActions,
  useTextRefreshCount,
} from '../../stores/TextStore'
import {
  useIsDoneTyping,
  useTypingStatsActions,
} from '../../stores/TypingStatsStore'
import {
  useIsSearchingForMatch,
  useName,
  usePlayerId,
} from '../../stores/MultiplayerStore'

let getWrongKeyIndex: (_: string) => number | undefined

function TypingArea(
  { typingContainerFocusCount }: {
    typingContainerFocusCount: number
  },
) {
  const textRefreshCount = useTextRefreshCount()
  const isDoneTyping = useIsDoneTyping()
  const cursorIndex = useCursorIndex()
  const isSearchingForMatch = useIsSearchingForMatch()
  const name = useName()
  const playerId = usePlayerId()
  const {
    setTextBeforeCursor,
    setTextAfterCursor,
    setWrongTextStartIndex,
    setText,
    setCursorIndex,
  } = useTextActions()
  const {
    finishTypingGame,
    increaseWrongKeyCount,
    increaseCorrectKeyCount,
    setCursorToMoved,
  } = useTypingStatsActions()

  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(
    () => toggleFocusOfTypingArea(typingContainerFocusCount, typingAreaRef),
    [typingContainerFocusCount, isDoneTyping],
  )

  const [textArray, setTextArray] = useState([''])
  useEffect(() => {
    fetch('http://localhost:8000/random-texts')
      .then((response) => response.json())
      .then((json) => {
        const jsonMessage = json as Message
        if (jsonMessage.type === 'randomText') {
          const randomTextMessage = json as RandomTextMessage
          const text = randomTextMessage.data.text
          setTextArray(text.split(''))
          getWrongKeyIndex = trackTextForWrongKeys(text)
          setText(text)
        }
      })
  }, [textRefreshCount])

  useEffect(() => {
    if (!isSearchingForMatch) {
      return
    }
    const ws = new WebSocket('ws://localhost:8000')
    ws.onopen = () => {
      console.log('Connected to websocket server')
      const playerInfo: PlayerInfoMessage = {
        type: 'searchingPlayer',
        data: {
          name: name,
          playerId: playerId,
        },
      }
      const jsonPlayerInfo = JSON.stringify(playerInfo)
      ws.send(jsonPlayerInfo)
    }
    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data)
      switch (data.type) {
        case 'matchFound':
          break
        case 'gameUpdate':
          break
      }
    }
    ws.onclose = () => {
      console.log('Closed websocket connection')
    }

    return () => {
      ws.close()
    }
  }, [isSearchingForMatch])

  useEffect(() => {
    cursorIndex > 0 && setCursorToMoved()
  }, [cursorIndex])

  const textBeforeCursor = textArray.slice(0, cursorIndex).join('')
  const textAfterCursor = textArray.slice(cursorIndex).join('')
  useEffect(() => {
    setTextAfterCursor(textAfterCursor)
    setTextBeforeCursor(textBeforeCursor)
    if (textBeforeCursor && !textAfterCursor) finishTypingGame()
  })

  function setCursorPosition(key: string) {
    const isKeyIsOutOfBounds = key === 'Backspace' && cursorIndex === 0
    if (isKeyIsOutOfBounds) return
    setCursorIndex(key)
  }
  function handleKeypress(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key
    if (isControlKey(key)) return
    setCursorPosition(key)
    const wrongKeyIndex = getWrongKeyIndex(key)
    if (wrongKeyIndex === undefined) return
    setWrongTextStartIndex(wrongKeyIndex)
    wrongKeyIndex > -1 ? increaseWrongKeyCount() : increaseCorrectKeyCount()
  }

  return (
    <textarea
      ref={typingAreaRef}
      onKeyDown={handleKeypress}
      id='typing-area'
      autoFocus
    />
  )
}

export default TypingArea
