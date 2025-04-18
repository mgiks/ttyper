package typing

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mgiks/ttyper/dtos"
	"github.com/mgiks/ttyper/server"
	"github.com/mgiks/ttyper/utils"
)

type typingServer struct {
	mux http.ServeMux
}

func NewTypingServer() *typingServer {
	ts := &typingServer{}
	// ts.mux.HandleFunc("/", ts.subscribeHandler)
	ts.mux.HandleFunc("GET /random-texts", ts.getRandomTextHandler)

	return ts
}

func (ts *typingServer) getRandomTextHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	rtm := getRandomTextMessage()

	jsonRtm, err := json.Marshal(rtm)
	if err != nil {
		log.Printf("Failed to marshal text to json: %v\n", err)
	}

	w.Write(jsonRtm)
}

// func (ts *typingServer) subscribeHandler(w http.ResponseWriter, r *http.Request) {
// 	var acceptOptions = &websocket.AcceptOptions{
// 		OriginPatterns: []string{"localhost:5173"},
// 	}
//
// 	wsc, err := websocket.Accept(w, r, acceptOptions)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
//
// 	ctx := context.Background()
// 	text := getText()
// 	err = wsc.Write(ctx, websocket.MessageText, text)
// 	if err != nil {
// 		log.Printf("Failed to send text: %v\n", err)
// 	}
//
// 	for {
// 		msgType, msg, err := wsc.Read(ctx)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
//
// 		if msgType == websocket.MessageText {
// 			fmt.Println(string(msg))
// 		}
// 	}
// }

func (ts *typingServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ts.mux.ServeHTTP(w, r)
}

func getRandomTextMessage() *dtos.RandomTextMessage {
	db := server.GetServerConfig().Db

	t := &dtos.RandomTextMessage{}
	t.SetMessageType()

	row := db.GetRandomText()
	td := &t.Data
	err := row.Scan(&td.Id, &td.Text, &td.Submitter, &td.Source)
	if err != nil {
		log.Printf("Failed to get text: %v\n", err)
	}

	return t
}
