package dtos

type Message struct {
	MessageType string `json:"messageType"`
}

type IsMessage interface {
	SetMessageType()
}

type RandomTextData struct {
	Id        int    `json:"id"`
	Text      string `json:"text"`
	Submitter string `json:"submitter"`
	Source    string `json:"source"`
}

type RandomTextMessage struct {
	Message
	Data RandomTextData `json:"data"`
}

func (m *RandomTextMessage) SetMessageType() {
	m.MessageType = "randomText"
}

type KeyCheckData struct {
	PressedKey string `json:"pressedKey"`
	IsRight    bool   `json:"isRight"`
}

type KeyCheck struct {
	Message
	Data KeyCheckData `json:"data"`
}

func (m *KeyCheck) SetMessageType() {
	m.MessageType = "keyCheck"
}
