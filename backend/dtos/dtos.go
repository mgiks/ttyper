package dtos

type Message struct {
	Type string `json:"type"`
}

type randomTextData struct {
	Id        int    `json:"id"`
	Text      string `json:"text"`
	Submitter string `json:"submitter"`
	Source    string `json:"source"`
}

type RandomTextMessage struct {
	Message
	Data randomTextData `json:"data"`
}

func (m *RandomTextMessage) setMessageType() {
	m.Type = "randomText"
}

func NewRandomTextMessage() *RandomTextMessage {
	m := RandomTextMessage{}
	m.setMessageType()
	return &m
}

type matchFoundData struct {
	MatchID     string   `json:"matchID"`
	Text        string   `json:"text"`
	PlayerNames []string `json:"playerNames"`
}

type MatchFoundMessage struct {
	Message
	Data matchFoundData `json:"data"`
}

func (m *MatchFoundMessage) setMessageType() {
	m.Type = "matchFound"
}

func NewMatchFoundMessage() *MatchFoundMessage {
	m := MatchFoundMessage{}
	m.setMessageType()
	return &m
}

type searchForMatchData struct {
	PlayerName string `json:"playerName"`
	PlayerId   string `json:"playerId"`
}

type SearchForMatchMessage struct {
	Message
	Data searchForMatchData `json:"data"`
}
