package sheets

import (
	"errors"
	"net/http"

	"github.com/Soesah/shortcut-sheet-generator/api/models"
)

var (
	errCreateInvalidSheet = errors.New("Could not create sheet, data is invalid")
	errStoreInvalidSheet  = errors.New("Could not update sheet, data is invalid")
)

// GetList returns a list of sheets
func GetList(r *http.Request) ([]models.Sheet, error) {
	var ps []models.Sheet

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return ps, err
	}

	return c.Sheets, nil
}

// Create adds a sheet
func Create(sheet models.Sheet, r *http.Request) (models.Sheet, error) {

	if sheet.Description == "" {
		return sheet, errCreateInvalidSheet
	}

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return sheet, err
	}

	sheet, err = c.AddSheet(sheet)

	if err != nil {
		return sheet, err
	}

	err = c.Store(r)

	if err != nil {
		return sheet, err
	}

	return sheet, nil
}

// Store updates a sheet
func Store(sheet models.Sheet, r *http.Request) (models.Sheet, error) {
	// if !sheet.IsValid() {
	// 	return sheet, errStoreInvalidSheet
	// }

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return sheet, err
	}

	err = c.UpdateSheet(sheet)

	if err != nil {
		return sheet, err
	}

	err = c.Store(r)

	if err != nil {
		return sheet, err
	}

	return sheet, nil
}

// Delete removes a sheet
func Delete(id int64, r *http.Request) (bool, error) {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return false, err
	}

	err = c.RemoveSheet(id)

	if err != nil {
		return false, err
	}

	err = c.Store(r)

	if err != nil {
		return false, err
	}

	return true, nil
}
