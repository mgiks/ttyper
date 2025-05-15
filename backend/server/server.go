package server

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"

	"github.com/coder/websocket"
	"github.com/mgiks/ttyper/db"
)

type player struct {
	conn *websocket.Conn
	name string
	id   string
}

type playerManager struct {
	searchingPlayers map[string]*player
	mu               sync.Mutex
}

type match struct {
	players []*player
}

type matchManager struct {
	matches map[string]match
	mu      sync.RWMutex
}

type server struct {
	mux http.ServeMux
	pm  *playerManager
	mm  *matchManager
	db  *db.Database
	mr  *messageRouter
}

func (s *server) setupRoutes() {
	s.mr = NewMessageRouter()
	s.mr.addMessageHandler("searchForMatch", s.searchForMatch)
}

func (s *server) setupDB() {
	ctx := context.TODO()
	s.db = db.ConnectToDB(ctx)
}

func (s *server) matchPlayers() {
	for {
		if len(s.pm.searchingPlayers) >= 2 {
			matchedPlayers := make([]*player, 0, 2)
			for _, v := range s.pm.searchingPlayers {
				matchedPlayers = append(matchedPlayers, v)
				if len(matchedPlayers) == 2 {
					break
				}
			}
			playerIDs := make([]string, 0, 2)
			playerNames := make([]string, 0, 2)
			for _, p := range matchedPlayers {
				fmt.Println("Deleting", p.name)
				playerIDs = append(playerIDs, p.id)
				playerNames = append(playerNames, p.name)
				delete(s.pm.searchingPlayers, p.id)
			}
			m := match{players: matchedPlayers}
			matchId := strings.Join(playerIDs, " VS ")
			s.mm.mu.Lock()
			s.mm.matches[matchId] = m
			s.mm.mu.Unlock()

			mfm := s.createMatchFoundMessage(matchId, playerNames)
			jsonMfm, err := json.Marshal(mfm)
			if err != nil {
				return
			}
			for _, p := range s.mm.matches[matchId].players {
				err := p.conn.Write(context.TODO(), websocket.MessageText, jsonMfm)
				if err != nil {
					p.conn.CloseNow()
				}
			}
		}
	}
}

func (s *server) launchMatchmaker() {
	go s.matchPlayers()
}

func New() *server {
	s := &server{
		pm: &playerManager{
			searchingPlayers: make(map[string]*player),
		},
		mm: &matchManager{
			matches: make(map[string]match),
		},
	}
	s.setupDB()
	s.setupRoutes()
	s.launchMatchmaker()
	s.mux.HandleFunc("/", s.websocketMessageHandler)
	s.mux.HandleFunc("GET /random-texts", s.getRandomTextHandler)
	return s
}
