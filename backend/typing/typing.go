package typing

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/coder/websocket"
	"github.com/mgiks/ttyper/dtos"
	"github.com/mgiks/ttyper/server"
	"github.com/mgiks/ttyper/utils"
)

type typingServer struct {
	mux http.ServeMux
}

func NewTypingServer() *typingServer {
	ts := &typingServer{}
	ts.mux.HandleFunc("/", ts.matchHandler)
	ts.mux.HandleFunc("GET /random-texts", ts.getRandomTextHandler)
	return ts
}

func (ts *typingServer) getRandomTextHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	rtm := buildRandomTextMessage()
	jsonRtm, err := json.Marshal(rtm)
	if err != nil {
		log.Printf("Failed to marshal text to json: %v\n", err)
	}
	_, err = w.Write(jsonRtm)
	if err != nil {
		log.Printf("Failed to send random text message: %v\n", err)
	}
}

var searchingPlayers = make([]dtos.SearchingPlayerMessage, 0)

func (ts *typingServer) matchHandler(w http.ResponseWriter, r *http.Request) {
	var acceptOptions = &websocket.AcceptOptions{
		OriginPatterns: []string{"localhost:5173"},
	}
	wsc, err := websocket.Accept(w, r, acceptOptions)
	if err != nil {
		log.Printf("Failed to accept websocket connection: %v\n", err)
	}

	c := make(chan bool)
	go searchForPlayers(c)

	ctx := context.Background()
	for {
		foundPlayers := <-c
		if foundPlayers {
			mf := buildMatchFoundMessage()
			jsonGf, err := json.Marshal(mf)
			if err != nil {
				log.Printf("Failed to marshal game found json: %v\n", err)
			}

			if err = wsc.Write(ctx, websocket.MessageText, jsonGf); err != nil {
				wsc.CloseNow()
			}
		} else {
			msgType, msg, err := wsc.Read(ctx)
			if err != nil {
				wsc.CloseNow()
			}

			if msgType == websocket.MessageText {
				var m dtos.Message
				if err := json.Unmarshal(msg, &m); err != nil {
					log.Printf("Failed to unmarshal message: %v\n", err)
					continue
				}
				switch m.Type {
				case "searchingPlayer":
					var sp dtos.SearchingPlayerMessage
					if err := json.Unmarshal(msg, &sp); err != nil {
						log.Printf("Failed to unmarshal searching player message: %v\n", err)
						continue
					}
					searchingPlayers = append(searchingPlayers, sp)
					fmt.Println(searchingPlayers)
				default:
					wsc.Close(1003, "Unknown message type")
				}
			}
		}
	}
}

func (ts *typingServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ts.mux.ServeHTTP(w, r)
}

func searchForPlayers(c chan bool) {
	for {
		if len(searchingPlayers) > 2 {
			c <- true
		} else {
			c <- false
		}
	}
}

func buildRandomTextMessage() *dtos.RandomTextMessage {
	db := server.GetServerConfig().Db

	rtm := dtos.NewRandomTextMessage()

	row := db.GetRandomTextRow()
	err := row.Scan(
		&rtm.Data.Id,
		&rtm.Data.Text,
		&rtm.Data.Submitter,
		&rtm.Data.Source,
	)
	if err != nil {
		log.Printf("Failed to get random text row: %v\n", err)
		return nil
	}

	return rtm
}

func buildMatchFoundMessage() *dtos.MatchFoundMessage {
	db := server.GetServerConfig().Db

	mfm := dtos.NewMatchFoundMessage()

	row := db.GetRandomText()
	mfm.Data.Text = row
	mfm.Data.Players = []string{"mgik", "somebody"}

	return mfm
}
