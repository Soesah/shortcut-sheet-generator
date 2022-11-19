package pdf

import (
	"github.com/Soesah/shortcut-sheet-generator/api/models"
	"github.com/johnfercher/maroto/pkg/color"
	"github.com/johnfercher/maroto/pkg/consts"
	maroto "github.com/johnfercher/maroto/pkg/pdf"
	"github.com/johnfercher/maroto/pkg/props"
)

func getLeftPosition(shortCut models.ShortCut, pos int64) float64 {
	var left float64 = 0

	if shortCut.ControlKey {
		left += 9
	}
	if shortCut.AltKey && pos != 1 {
		left += 8
	}
	if shortCut.ShiftKey && pos != 2 {
		left += 10
	}
	if shortCut.CommandKey && pos != 3 {
		left += 8
	}

	return left
}

func GeneratePDF(sheet models.Sheet) ([]byte, error) {
	var bytes []byte

	// path, err := os.Getwd()
	// if err != nil {
	// 	return bytes, err
	// }

	m := maroto.NewMaroto(consts.Portrait, consts.A4)

	// m.SetDefaultFontFamily("Verdana")

	// m.SetFontLocation("/src/css/fonts/open-sans-v34-latin-300.ttf")
	m.AddUTF8Font("Open Sans", consts.Normal, "/src/css/fonts/open-sans-v34-latin-regular.ttf")
	m.AddUTF8Font("Open Sans", consts.Italic, "/src/css/fonts/open-sans-v34-latin-italic.ttf")
	m.AddUTF8Font("Open Sans", consts.Bold, "/src/css/fonts/open-sans-v34-latin-700.ttf")
	m.AddUTF8Font("Open Sans", consts.BoldItalic, "/src/css/fonts/open-sans-v34-latin-700italic.ttf")
	m.SetDefaultFontFamily("Open Sans")

	m.SetPageMargins(10, 0, 10)
	// m.SetBorder(true)

	m.RegisterHeader(func() {
		m.Row(14, func() {
			m.Col(12, func() {
				m.Text(sheet.Description, props.Text{
					Top:  0,
					Size: 20,
				})
			})
		})
	})

	m.RegisterFooter(func() {
		m.Row(10, func() {

			m.Col(12, func() {
				m.Text("Carl Giesberts 2022  - Page 1", props.Text{
					Size:  8,
					Top:   0,
					Align: "right",
				})
			})
		})
	})

	for _, shortCut := range sheet.ShortCuts {

		m.Row(7, func() {

			m.Col(3, func() {
				if shortCut.ControlKey {
					m.SetBackgroundColor(color.Color{Red: 254, Green: 243, Blue: 200})
					m.Text("CTRL", props.Text{
						Size: 9,
						Top:  1.75,
					})
					m.SetBackgroundColor(color.NewWhite())

				}
				if shortCut.AltKey {
					m.Text("ALT", props.Text{
						Size: 9,
						Top:  1.75,
						Left: getLeftPosition(shortCut, 1),
					})
				}
				if shortCut.ShiftKey {
					m.Text("SHIFT", props.Text{
						Size: 9,
						Top:  1.75,
						Left: getLeftPosition(shortCut, 2),
					})
				}
				if shortCut.CommandKey {
					m.Text("CMD", props.Text{
						Size: 9,
						Top:  1.75,
						Left: getLeftPosition(shortCut, 3),
					})
				}
				m.Text(shortCut.Key, props.Text{
					Size:  12,
					Top:   1,
					Left:  getLeftPosition(shortCut, 4),
					Style: consts.Bold,
				})
			})
			m.Col(9, func() {
				m.Text(shortCut.Description, props.Text{
					Size: 12,
					Top:  1,
				})
			})
		})
	}

	b, err := m.Output()

	if err != nil {
		return bytes, err
	}

	return b.Bytes(), nil
}
