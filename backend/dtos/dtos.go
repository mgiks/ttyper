package dtos

type Message struct {
	MessageType string `json:"messageType"`
}

type IsMessage interface {
	SetMessageType()
}

type TextData struct {
	Id        int    `json:"id"`
	Text      string `json:"text"`
	Submitter string `json:"submitter"`
	Source    string `json:"source"`
}

type Text struct {
	Message
	TextData
}

func (m *Text) SetMessageType() {
	m.Message.MessageType = "text"
}

type KeyCheckData struct {
	PressedKey string `json:"pressedKey"`
	IsRight    bool   `json:"isRight"`
}

type KeyCheck struct {
	Message
	KeyCheckData
}

func (m *KeyCheck) SetMessageType() {
	m.Message.MessageType = "keyCheck"
}
