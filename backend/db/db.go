package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type database struct {
	url     string
	pool    *pgxpool.Pool
	context context.Context
}

func ConnectToDB(ctx context.Context) *database {
	envs := map[string]string{
		"dbPass": "POSTGRES_PASSWORD",
		"dbPort": "POSTGRES_PORT",
		"dbName": "POSTGRES_DB",
	}

	foundEnvs := make(map[string]string)

	for k, v := range envs {
		env := os.Getenv(v)

		if len(env) == 0 {
			log.Fatalf("Env `%v` not found", v)
		}

		foundEnvs[k] = env
	}

	dbPass := foundEnvs["dbPass"]
	dbPort := foundEnvs["dbPort"]
	dbName := foundEnvs["dbName"]

	dbUrl := fmt.Sprintf(
		"postgres://postgres:%s@localhost:%s/%s",
		dbPass,
		dbPort,
		dbName,
	)

	dbPool, err := pgxpool.New(ctx, dbUrl)
	if err != nil {
		log.Fatalf("Unable to connect to the database: %v\n", err)
	}

	db := database{url: dbUrl, pool: dbPool, context: ctx}

	err = db.pool.Ping(ctx)
	if err != nil {
		log.Fatalf("Unable to ping the database: %v\n", err)
	}

	return &db
}

func (db *database) Query(query string, args ...any) *pgx.Rows {
	rows, err := db.pool.Query(db.context, query, args...)
	if err != nil {
		log.Fatalf("Query `%v` failed: %v\n", query, err)
	}

	return &rows
}

func (db *database) AddTypingText(text string, uploaderName string) *pgx.Rows {
	rows := db.Query(
		`INSERT INTO typing_text(text, uploader_name) 
		VALUES ($1, $2) RETURNING text, uploader_name`,
		text,
		uploaderName,
	)

	return rows
}
