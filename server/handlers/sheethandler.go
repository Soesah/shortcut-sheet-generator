package handlers

import (
	"net/http"

	"github.com/Soesah/shortcut-sheet-generator/api/sheets"
	"github.com/Soesah/shortcut-sheet-generator/server/httpext"
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
