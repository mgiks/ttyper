package dtos

type Text struct {
	Id        int    `json:"id"`
	Text      string `json:"text"`
	Submitter string `json:"submitter"`
	Source    string `json:"source"`
}

type KeyCheck struct {
	PressedKey string `json:"pressedKey"`
	IsRight    bool   `json:"IsRight"`
}
