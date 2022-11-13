package models

type ShortCut struct {
	ID          int64  `json:"id"`
	ControlKey  bool   `json:"controlKey,omitempty"`
	ShiftKey    bool   `json:"shiftKey,omitempty"`
	AltKey      bool   `json:"altKey,omitempty"`
	CommandKey  bool   `json:"commandKey,omitempty"`
	Key         string `json:"key"`
	Description string `json:"description"`
	Location    string `json:"location,omitempty"`
}
