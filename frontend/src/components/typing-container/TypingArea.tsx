import { useContext, useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { TextMessage } from '../shared/dtos/message'
import { TextContext } from './context/TextContext'

function TypingArea() {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)
  const websocketConnection =
    useRef(new WebSocket('ws://localhost:8000')).current
  const [websocketConnectionEstablished, setWebsocketConnectionEstablished] =
    useState(false)
  const { setText } = useContext(TextContext)

  useEffect(() => {
    websocketConnection.addEventListener('open', (_) => {
      console.log('Connected to websocket server')
      setWebsocketConnectionEstablished(true)
    })

    websocketConnection.addEventListener('message', (e) => {
      const message: TextMessage = JSON.parse(e.data)
      const messageType = message.messageType
      const messageData = message.data
      if (messageType == 'text') {
        setText(messageData.text)
      }
    })
  }, [])

  function sendKeypress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!websocketConnectionEstablished) {
      return
    }

    const key = event.key

    // Needed to exclude control keys
    if (key != 'Backspace' && key.length > 1) {
      return
    }

    websocketConnection.send(key)

    console.log('Key press sent:', key)
  }

  function toggleFocus() {
    const typingArea = typingAreaRef.current!

    isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
  }

  useEffect(toggleFocus, [isTypingContainerFocused])

  return (
    <textarea
      ref={typingAreaRef}
      onKeyDown={sendKeypress}
      id='typing-area'
      autoFocus
    />
  )
}

export default TypingArea
