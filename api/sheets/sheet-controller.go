package sheets

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/Soesah/shortcut-sheet-generator/api/models"
	"github.com/Soesah/shortcut-sheet-generator/api/storage"
)

var (
	errNotInitialized = errors.New("controller not initialized")
	errNoSheetsToSave = errors.New("no sheets to save")
	errSheetNotFound  = errors.New("sheet not found, name incorrect")
)

// Controller is a controller for the database
type Controller struct {
	NewID  int64
	Sheets []models.Sheet
}

// Load loads the hours
func (c *Controller) Load(r *http.Request) error {
	var sheets []models.Sheet

	data, err := storage.GetFile("sheets", r)

	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &sheets)

	if err != nil {
		return err
	}

	c.Sheets = sheets
	c.parseNewID()

	return nil
}

// Store saves the database
func (c *Controller) Store(r *http.Request) error {

	if len(c.Sheets) == 0 {
		return errNoSheetsToSave
	}

	data, err := json.MarshalIndent(c.Sheets, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("sheets", data, r)

	if err != nil {
		return err
	}

	return nil
}

// parseNewID reads the hours and sets newID
func (c *Controller) parseNewID() {
	var newID int64 = 0

	for _, h := range c.Sheets {
		if h.ID > newID {
			newID = h.ID
		}
	}

	c.NewID = newID
}

// getNewID raises the internal ID and returns a new one
func (c *Controller) getNewID() int64 {

	c.NewID = c.NewID + 1
	return c.NewID
}

// AddSheet adds a sheet to the database
func (c *Controller) AddSheet(b models.Sheet) (models.Sheet, error) {

	b.ID = c.getNewID()

	sheets := c.Sheets

	c.Sheets = append(sheets, b)

	return b, nil
}

// GetSheet gets a sheet from the database
func (c *Controller) GetSheet(id int64) (models.Sheet, error) {
	var sheet models.Sheet

	if len(c.Sheets) == 0 {
		return sheet, errNotInitialized
	}

	sheets := c.Sheets

	for _, i := range c.Sheets {
		if i.ID == id {
			sheet = i
		}
	}

	if sheet.Description == "" {
		return sheet, errSheetNotFound
	}

	c.Sheets = sheets

	return sheet, nil
}

// UpdateSheet updates a sheet to the database
func (c *Controller) UpdateSheet(sheet models.Sheet) error {

	if len(c.Sheets) == 0 {
		return errNotInitialized
	}

	var sheets []models.Sheet

	found := false
	for _, p := range c.Sheets {
		if p.ID == sheet.ID {
			sheets = append(sheets, sheet)
			found = true
		} else {
			sheets = append(sheets, p)
		}
	}

	if !found {
		return errSheetNotFound
	}

	c.Sheets = sheets

	return nil
}

// RemoveSheet removes a sheet from the database
func (c *Controller) RemoveSheet(id int64) error {

	if len(c.Sheets) == 0 {
		return errNotInitialized
	}

	var sheets []models.Sheet

	found := false
	for _, i := range c.Sheets {
		if i.ID == id {
			found = true
		} else {
			sheets = append(sheets, i)
		}
	}

	if !found {
		return errSheetNotFound
	}

	c.Sheets = sheets

	return nil
}
