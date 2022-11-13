package models

type Sheet struct {
	ID          int64      `json:"id"`
	Description string     `json:"description"`
	ShortCuts   []ShortCut `json:"shortcuts"`
}
