package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/coder/websocket"
	"github.com/mgiks/ttyper/dtos"
)

func (s *server) getRandomTextHandler(w http.ResponseWriter, r *http.Request) {
	s.enableCORS(&w)
	rtm := s.randomTextMessage()
	jsonRtm, err := json.Marshal(rtm)
	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	if _, err = w.Write(jsonRtm); err != nil {
		http.Error(w, "", http.StatusInternalServerError)
	}
}

func (s *server) websocketMessageHandler(
	w http.ResponseWriter, r *http.Request,
) {
	acceptOptions := &websocket.AcceptOptions{
		OriginPatterns: []string{"localhost:5173"},
	}
	wsc, err := websocket.Accept(w, r, acceptOptions)
	if err != nil {
		wsc.CloseNow()
	}

	p := player{conn: wsc}
	for {
		fmt.Println(s.pm.players)
		wsMessageType, wsMessage, err := p.conn.Read(s.ctx)
		if err != nil {
			s.pm.mu.Lock()
			delete(s.pm.players, p.id)
			s.pm.mu.Unlock()

			fmt.Println(s.pm.players)
			p.conn.CloseNow()
			return
		}

		if wsMessageType != websocket.MessageText {
			return
		}

		var wsm dtos.Message
		if err := json.Unmarshal(wsMessage, &wsm); err != nil {
			log.Printf("Failed to unmarshal websocketMessage: %v\n", err)
		}

		s.mr.routeMessage(p, wsm.Type, wsMessage)
	}
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.mux.ServeHTTP(w, r)
}
