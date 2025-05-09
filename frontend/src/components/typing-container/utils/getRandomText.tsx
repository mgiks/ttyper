import { RandomTextMessage } from '../dtos/Message'

export async function getRandomText() {
  const response = await fetch('http://localhost:8000/random-texts')
  const randomTextMessage = await response.json() as RandomTextMessage
  return randomTextMessage.data.text
}
