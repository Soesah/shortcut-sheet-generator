package handlers

import (
	"encoding/json"
	"html/template"
	"net/http"
	"os"

	"github.com/Soesah/shortcut-sheet-generator/server/httpext"
)

// RootHandler is used to serve index.html
func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	dir, _ := os.Getwd()
	t, err := template.ParseFiles(dir + "/dist/index.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl := template.Must(t, err)

	tmpl.Execute(w, "")
}

// NotSupportedAPIHandler is used to serve a response when the api is not implemented
func NotSupportedAPIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response := httpext.Response{
		Message: "API Not Supported",
	}

	data, err := json.Marshal(response)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	w.Write(data)
}
