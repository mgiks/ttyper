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

type data struct {
	Nickname string `json:"nickname"`
	PlayerId int    `json:"playerId"`
}

type searchingPlayer struct {
	Type string `json:"type"`
	Data data   `json:"data"`
}

var searchingPlayers = make([]searchingPlayer, 0)

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

			err = wsc.Write(ctx, websocket.MessageText, jsonGf)
			if err != nil {
				wsc.CloseNow()
			}
		} else {
			msgType, msg, err := wsc.Read(ctx)
			if err != nil {
				wsc.CloseNow()
			}

			if msgType == websocket.MessageText {
				var sp searchingPlayer
				err := json.Unmarshal(msg, &sp)
				if err != nil {
					log.Printf("Failed to unmarshal searching player message: %v\n", err)
				}
				fmt.Printf("%+v\n", sp)
				searchingPlayers = append(searchingPlayers, sp)
			}
		}
	}
}

//	func (ts *typingServer) bitch(w http.ResponseWriter, r *http.Request) {
//		var acceptOptions = &websocket.AcceptOptions{
//			OriginPatterns: []string{"localhost:5173"},
//		}
//
//		wsc, err := websocket.Accept(w, r, acceptOptions)
//		if err != nil {
//			log.Fatal(err)
//		}
//
//		ctx := context.Background()
//		text :=
//		err = wsc.Write(ctx, websocket.MessageText, text)
//		if err != nil {
//			log.Printf("Failed to send text: %v\n", err)
//		}
//
//		for {
//			msgType, msg, err := wsc.Read(ctx)
//			if err != nil {
//				log.Fatal(err)
//			}
//
//			if msgType == websocket.MessageText {
//				fmt.Println(string(msg))
//			}
//		}
//	}

func (ts *typingServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ts.mux.ServeHTTP(w, r)
}

func searchForPlayers(c chan bool) {
	for {
		if len(searchingPlayers) > 1 {
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
