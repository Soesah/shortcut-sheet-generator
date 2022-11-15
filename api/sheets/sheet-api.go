package sheets

import (
	"errors"
	"net/http"

	"github.com/Soesah/shortcut-sheet-generator/api/models"
)

var (
	errCreateInvalidSheet = errors.New("could not create sheet, data is invalid")
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

// Update updates a sheet
func Update(sheetID int64, sheet models.Sheet, r *http.Request) (models.Sheet, error) {

	if sheet.Description == "" {
		return sheet, errCreateInvalidSheet
	}

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

// AddShortCut adds a shortcut to the sheet
func AddShortCut(sheetID int64, shortCut models.ShortCut, r *http.Request) (models.Sheet, error) {

	var sheet models.Sheet

	if shortCut.Description == "" {
		return sheet, errCreateInvalidSheet
	}

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return sheet, err
	}

	sheet, err = c.GetSheet(sheetID)

	if err != nil {
		return sheet, err
	}

	sheet.AddShortCut(shortCut)

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

// UpdateShortCut adds a shortcut to the sheet
func UpdateShortCut(sheetID int64, shortCutID int64, shortCut models.ShortCut, r *http.Request) (models.Sheet, error) {

	var sheet models.Sheet

	if shortCut.Description == "" {
		return sheet, errCreateInvalidSheet
	}

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return sheet, err
	}

	sheet, err = c.GetSheet(sheetID)

	if err != nil {
		return sheet, err
	}

	sheet.UpdateShortCut(shortCutID, shortCut)

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
