import { useContext, useEffect, useRef, useState } from 'react'
import './TypingArea.css'
import { IsTypingContainerFocusedContext } from './context/IsTypingContainerFocusedContext'
import { TextMessage } from '../shared/dtos/message'
import { LeadingAndTralingTextContext } from './context/LeadingAndTralingTextContext'

function trackText(text: string) {
  const trackedText = text.split('')
  let currentCharIndex = 0

  return function (key: string) {
    const currentChar = trackedText[currentCharIndex]
    const nextCharIndex = currentCharIndex + 1
    currentCharIndex = nextCharIndex

    if (key != currentChar) {
      return false
    }
    return true
  }
}

let checkKey: (_: string) => boolean

function TypingArea() {
  const typingAreaRef = useRef<HTMLTextAreaElement>(null)
  const isTypingContainerFocused = useContext(IsTypingContainerFocusedContext)
  const websocketConnection =
    useRef(new WebSocket('ws://localhost:8000')).current
  const [websocketConnectionEstablished, setWebsocketConnectionEstablished] =
    useState(false)
  const { leadingText, setLeadingText, trailingText, setTrailingText } =
    useContext(
      LeadingAndTralingTextContext,
    )

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
        const text = messageData.text
        setTrailingText(text)
        checkKey = trackText(text)
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

  function setTrailingAndLeadingText(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    const key = event.key

    if (key != 'Backspace' && key.length > 1) {
      return
    }

    const leadingTextArray = leadingText.split('')
    const trailingTextArray = trailingText.split('')

    if (key == 'Backspace') {
      const leadingTextLastChar = leadingTextArray.pop()
      if (leadingTextLastChar) {
        trailingTextArray.reverse()
        trailingTextArray.push(leadingTextLastChar)
        trailingTextArray.reverse()
      }
    } else {
      trailingTextArray.reverse()
      const trailingTextFirstChar = trailingTextArray.pop()
      if (trailingTextFirstChar) {
        leadingTextArray.push(trailingTextFirstChar)
      }
      trailingTextArray.reverse()
    }

    setLeadingText(leadingTextArray.join(''))
    setTrailingText(trailingTextArray.join(''))
  }

  function toggleFocus() {
    const typingArea = typingAreaRef.current!

    isTypingContainerFocused ? typingArea.focus() : typingArea.blur()
  }

  useEffect(toggleFocus, [isTypingContainerFocused])

  return (
    <textarea
      ref={typingAreaRef}
      onKeyDown={setTrailingAndLeadingText}
      id='typing-area'
      autoFocus
    />
  )
}

export default TypingArea
