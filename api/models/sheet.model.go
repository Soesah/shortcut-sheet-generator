package models

type Sheet struct {
	ID          int64      `json:"id"`
	Description string     `json:"description"`
	ShortCuts   []ShortCut `json:"shortcuts"`
}

// getNewID returns a new ID for a shortcut
func (s *Sheet) getNewID() int64 {
	var newID int64 = 0

	for _, h := range s.ShortCuts {
		if h.ID > newID {
			newID = h.ID

		}
	}

	return newID + 1
}

func (s *Sheet) AddShortCut(shortCut ShortCut) {
	shortCut.ID = s.getNewID()
	s.ShortCuts = append(s.ShortCuts, shortCut)
}
