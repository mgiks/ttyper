export function connectWebSocket(handleMessage: (e: MessageEvent) => void) {
  const ws = new WebSocket('ws://localhost:8000')
  ws.onopen = () => {
    console.log('Connected to websocket server')
  }
  ws.onmessage = handleMessage
  return ws
}
