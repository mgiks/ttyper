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

export interface MatchFoundData {
  matchID: string
  text: string
  playerNames: string[]
}

export interface MatchFoundMessage extends Message {
  data: MatchFoundData
}
