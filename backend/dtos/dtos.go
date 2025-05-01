package dtos

type message struct {
	MessageType string `json:"messageType"`
}

type randomTextData struct {
	Id        int    `json:"id"`
	Text      string `json:"text"`
	Submitter string `json:"submitter"`
	Source    string `json:"source"`
}

type RandomTextMessage struct {
	message
	Data randomTextData `json:"data"`
}

func (m *RandomTextMessage) setMessageType() {
	m.MessageType = "randomText"
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
	message
	Data matchFoundData `json:"data"`
}

func (m *MatchFoundMessage) setMessageType() {
	m.MessageType = "matchFound"
}

func NewMatchFoundMessage() *MatchFoundMessage {
	m := MatchFoundMessage{}
	m.setMessageType()
	return &m
}
