package server

import (
	"log"

	"github.com/mgiks/ttyper/dtos"
)

func (s *server) randomTextMessage() *dtos.RandomTextMessage {
	rtm := dtos.NewRandomTextMessage()
	row := s.db.GetRandomTextRow()
	if err := row.Scan(
		&rtm.Data.Id,
		&rtm.Data.Text,
		&rtm.Data.Submitter,
		&rtm.Data.Source,
	); err != nil {
		log.Printf("Failed to get random text row: %v\n", err)
		return nil
	}

	return rtm
}

// func (s *server) matchFoundMessage() *dtos.MatchFoundMessage {
// 	mfm := dtos.NewMatchFoundMessage()
// 	row := s.db.GetRandomText()
// 	mfm.Data.Text = row
// 	mfm.Data.Players = []string{"mgik", "somebody"}
//
// 	return mfm
// }
