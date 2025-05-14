package server

import (
	"sync"
)

type messageHandler func(p *player, m []byte)

type messageRouter struct {
	mhs map[string]messageHandler
	mu  sync.RWMutex
}

func NewMessageRouter() *messageRouter {
	return &messageRouter{mhs: make(map[string]messageHandler)}
}

func (mr *messageRouter) addMessageHandler(
	mType string, mh messageHandler,
) {
	mr.mu.Lock()
	defer mr.mu.Unlock()
	mr.mhs[mType] = mh
}

func (mr *messageRouter) routeMessage(p *player, mType string, m []byte) {
	mr.mu.RLock()
	defer mr.mu.RUnlock()
	mh, exists := mr.mhs[mType]
	if !exists {
		p.conn.CloseNow()
	}
	mh(p, m)
}
