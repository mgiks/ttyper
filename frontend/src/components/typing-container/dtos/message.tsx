type MessageType = 'randomText' | 'playerInfo' | 'matchFound' | 'gameUpdate'

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
  nickname: string
  playerId: number
}

export interface PlayerInfoMessage extends Message {
  data: PlayerInfo
}
