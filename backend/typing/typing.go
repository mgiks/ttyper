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
)

type typingServer struct {
	mux http.ServeMux
}

func NewTypingServer() *typingServer {
	ts := &typingServer{}
	ts.mux.HandleFunc("/", ts.subscribeHandler)

	return ts
}

func (ts *typingServer) subscribeHandler(w http.ResponseWriter, r *http.Request) {
	var acceptOptions *websocket.AcceptOptions = &websocket.AcceptOptions{
		OriginPatterns: []string{"localhost:5173"},
	}

	wsc, err := websocket.Accept(w, r, acceptOptions)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	text := getText()
	err = wsc.Write(ctx, websocket.MessageText, text)
	if err != nil {
		log.Printf("Failed to send text: %v\n", err)
	}

	for {
		msgType, msg, err := wsc.Read(ctx)
		if err != nil {
			panic(err)
		}

		if msgType == websocket.MessageText {
			fmt.Println(string(msg))
		}
	}
}

func (ts *typingServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ts.mux.ServeHTTP(w, r)
}

func getText() []byte {
	db := server.GetServerConfig().Db

	t := &dtos.Text{}
	t.SetMessageType()

	row := db.GetRandomText()
	td := &t.Data
	err := row.Scan(&td.Id, &td.Text, &td.Submitter, &td.Source)
	if err != nil {
		log.Printf("Failed to get text: %v\n", err)
	}

	jsonT, err := json.Marshal(t)
	if err != nil {
		log.Printf("Failed to marshal text to json: %v\n", err)
	}

	return jsonT
}
