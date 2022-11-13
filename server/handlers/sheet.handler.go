package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Soesah/shortcut-sheet-generator/api/models"
	"github.com/Soesah/shortcut-sheet-generator/api/sheets"
	"github.com/Soesah/shortcut-sheet-generator/server/httpext"
	"github.com/go-chi/chi"
)

// GetSheetList is used to get user a list
func GetSheetList(w http.ResponseWriter, r *http.Request) {

	us, err := sheets.GetList(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, us)
}

func CreateSheet(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var s models.Sheet
	_ = decoder.Decode(&s)

	ss, err := sheets.Create(s, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, ss)
}

func UpdateSheet(w http.ResponseWriter, r *http.Request) {
	sheetID, err := strconv.Atoi(chi.URLParam(r, "sheetID"))

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var s models.Sheet
	_ = decoder.Decode(&s)

	ss, err := sheets.Update(int64(sheetID), s, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, ss)
}

func AddShortCut(w http.ResponseWriter, r *http.Request) {
	sheetID, err := strconv.Atoi(chi.URLParam(r, "sheetID"))

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var s models.ShortCut
	_ = decoder.Decode(&s)

	ss, err := sheets.AddShortCut(int64(sheetID), s, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.JSON(w, ss)
}
