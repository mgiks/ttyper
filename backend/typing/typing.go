package typing

import (
	"context"
	"encoding/json"
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
	ts.mux.HandleFunc("/games", ts.searchGameHandler)
	ts.mux.HandleFunc("GET /random-texts", ts.getRandomTextHandler)
	return ts
}

func (ts *typingServer) getRandomTextHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	rtm := createRandomTextMessage()
	jsonRtm, err := json.Marshal(rtm)
	if err != nil {
		log.Printf("Failed to marshal text to json: %v\n", err)
	}
	_, err = w.Write(jsonRtm)
	if err != nil {
		log.Printf("Failed to send random text message: %v\n", err)
	}
}

type searchingPlayer struct {
	Id int `json:"id"`
}

var searchingPlayers = make([]searchingPlayer, 255)

func (ts *typingServer) searchGameHandler(w http.ResponseWriter, r *http.Request) {
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
			gf := dtos.GameFound{IsGameFound: true}
			jsonGf, err := json.Marshal(gf)
			if err != nil {
				log.Printf("Failed to marshal game found json: %v\n", err)
			}
			err = wsc.Write(ctx, websocket.MessageText, jsonGf)
			if err != nil {
				log.Printf("Failed to send game found response: %v\n", err)
			}
		} else {
			msgType, msg, err := wsc.Read(ctx)
			if err != nil {
				log.Printf("Failed to receive searching player data: %v\n", err)
			}
			if msgType == websocket.MessageText {
				var sp searchingPlayer
				err := json.Unmarshal(msg, &sp)
				if err != nil {
					log.Printf("Failed to unmarshal searching player message: %v\n", err)
				}
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
			return
		}
	}
}

func createRandomTextMessage() *dtos.RandomTextMessage {
	db := server.GetServerConfig().Db

	rtm := &dtos.RandomTextMessage{}
	rtm.SetMessageType()

	row := db.GetRandomText()
	rtmData := &rtm.Data
	err := row.Scan(&rtmData.Id, &rtmData.Text, &rtmData.Submitter, &rtmData.Source)
	if err != nil {
		log.Printf("Failed to get text: %v\n", err)
	}

	return rtm
}
