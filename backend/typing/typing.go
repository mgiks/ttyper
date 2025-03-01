package typing

import (
	"context"
	"fmt"
	"net/http"

	"github.com/coder/websocket"
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
	err = wsc.Write(ctx, websocket.MessageText, []byte("Connection established!"))

	if err != nil {
		panic(err)
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
