type MessageType =
  | 'randomText'
  | 'searchForMatch'
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

interface SearchForMatchData {
  playerName: string
  playerId: string
}

export interface SearchForMatchMessage extends Message {
  data: SearchForMatchData
}

interface MatchFoundMessageData {
  matchID: string
  text: string
  players: string[]
}

export interface MatchFoundMessage extends Message {
  data: MatchFoundMessageData
}
