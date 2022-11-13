package handlers

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi"
)

// ServeDir serves a directory
func ServeDir(r chi.Router, path string, root http.Dir) {
	filePath := path
	filePath = strings.TrimSuffix(filePath, "*")
	fs := http.StripPrefix(filePath, http.FileServer(root))

	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))
}

// ServeFile serves a file
func ServeFile(r chi.Router, path string, filePath string) {
	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filePath)
	}))
}
