package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Soesah/shortcut-sheet-generator/server/config"
	"github.com/Soesah/shortcut-sheet-generator/server/handlers"
	"github.com/Soesah/shortcut-sheet-generator/server/middlewares"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {

	config.Init()
	conf := config.Get()

	r := chi.NewRouter()

	r.Group(func(r chi.Router) {

		// middleware
		// r.Use(middleware.DefaultCompress)
		r.Use(middleware.RequestID)
		r.Use(middleware.RealIP)
		r.Use(middleware.Logger)
		r.Use(middleware.Recoverer)
		r.Use(middleware.Timeout(60 * time.Second))
		r.Use(middleware.RedirectSlashes)

		// api
		r.Route("/api", func(r chi.Router) {

			r.Route("/sheets", func(r chi.Router) {
				r.Use(middlewares.NoCache)
				r.Get("/", handlers.GetSheetList)
				r.Post("/", handlers.CreateSheet)
				r.Put("/{sheetID}", handlers.UpdateSheet)
				r.Post("/{sheetID}", handlers.AddShortCut)
				r.Put("/{sheetID}/{shortCutID}", handlers.UpdateShortCut)
			})
		})

		// home
		r.Get("/", handlers.RootHandler)
	})

	http.Handle("/", r)

	if conf.IsDev() {
		log.Printf("Dev server listening on port %d", 8584)
		log.Fatal(http.ListenAndServe(":8584", r))
	} else {
		log.Fatal(http.ListenAndServe(":8080", r))
	}

}
