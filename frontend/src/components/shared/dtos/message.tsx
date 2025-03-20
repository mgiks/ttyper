type MessageType = 'text' | 'keyCheck'

interface Message {
  messageType: MessageType
}

interface TextData {
  id: number
  text: string
  submitter: string
  source: string
}

export interface TextMessage extends Message {
  data: TextData
}
