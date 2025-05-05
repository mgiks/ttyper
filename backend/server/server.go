package server

import (
	"context"
	"net/http"
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
	players map[string]player
	mu      sync.RWMutex
}

type match struct {
	id      string
	players []player
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
	ctx context.Context
}

func (s *server) setupRoutes() {
	s.mr = NewMessageRouter()
	s.mr.addMessageHandler("searchForMatch", s.searchForMatch)
}

func (s *server) setupDB() {
	s.db = db.ConnectToDB(s.ctx)
}

func New() *server {
	s := &server{
		pm: &playerManager{
			players: make(map[string]player),
		},
		mm: &matchManager{
			matches: make(map[string]match),
		},
		ctx: context.Background(),
	}
	s.setupDB()
	s.setupRoutes()
	s.mux.HandleFunc("/", s.websocketMessageHandler)
	s.mux.HandleFunc("GET /random-texts", s.getRandomTextHandler)
	return s
}
