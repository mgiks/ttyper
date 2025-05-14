package server

import (
	"encoding/json"
	"log"

	"github.com/mgiks/ttyper/dtos"
)

func (s *server) searchForMatch(p *player, m []byte) {
	var sfmm dtos.SearchForMatchMessage
	if err := json.Unmarshal(m, &sfmm); err != nil {
		log.Printf("Failed to unmarshal searching player message: %v\n", err)
	}

	p.name = sfmm.Data.PlayerName
	p.id = sfmm.Data.PlayerId

	s.pm.mu.Lock()
	s.pm.searchingPlayers[p.id] = p
	s.pm.mu.Unlock()
}
