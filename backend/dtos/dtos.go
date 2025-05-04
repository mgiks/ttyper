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
	Text    string   `json:"text"`
	Players []string `json:"players"`
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

type searchingPlayerData struct {
	Name     string `json:"name"`
	PlayerId string `json:"playerId"`
}

type SearchingPlayerMessage struct {
	Message
	Data searchingPlayerData `json:"data"`
}
