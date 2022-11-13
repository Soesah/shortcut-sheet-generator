package httpext

import (
	"encoding/json"
	"net/http"
)

// JSON send json to the front-end
func JSON(w http.ResponseWriter, body interface{}) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(body)
}

// Response is a struct for simple JSON api responses
type Response struct {
	Error   string      `json:"error,omitempty"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// SuccessDataAPI returns a json response with a message and data
func SuccessDataAPI(w http.ResponseWriter, message string, data interface{}) {
	response := Response{
		Message: message,
		Data:    data,
	}

	JSON(w, response)
}

// SuccessAPI formats the response message to JSON.
func SuccessAPI(w http.ResponseWriter, message string) {
	response := Response{
		Message: message,
	}

	JSON(w, response)
}

// AbortAPI formats the response message to JSON with the error code
func AbortAPI(w http.ResponseWriter, message string, status int) {
	response := Response{
		Message: message,
	}

	w.Header().Add("Content-Type", "application/json")
	// need to set status after content type
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(response)
}

// Abort sends an error
func Abort(w http.ResponseWriter, message string, status int) {
	w.WriteHeader(status)
	w.Write([]byte(message))
}
