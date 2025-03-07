package db

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type database struct {
	URL string
}

var Dbpool *pgxpool.Pool

func ConnectToDB(ctx context.Context) *database {
	db := database{URL: os.Getenv("DATABASE_URL")}

	Dbpool, err := pgxpool.New(ctx, db.URL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to the database: %v\n", err)
		os.Exit(1)
	}
	defer Dbpool.Close()

	err = Dbpool.Ping(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to ping the database: %v\n", err)
		os.Exit(1)
	}

	return &db
}
