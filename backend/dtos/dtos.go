package dtos

type Text struct {
	Text string `json:"text"`
}

type KeyCheck struct {
	PressedKey string `json:"pressedKey"`
	IsRight    bool   `json:"IsRight"`
}
