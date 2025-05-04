type MessageType =
  | 'randomText'
  | 'searchingPlayer'
  | 'matchFound'
  | 'gameUpdate'

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

interface PlayerInfo {
  name: string
  playerId: string
}

export interface PlayerInfoMessage extends Message {
  data: PlayerInfo
}
