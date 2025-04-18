type MessageType = 'randomText'

export interface Message {
  type: MessageType
}

interface RandomTextData {
  id: number
  text: string
  submitter: string
  source: string
}

export interface RandomTextMessage extends Message {
  data: RandomTextData
}
