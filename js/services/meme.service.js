'use strict'

const STORAGE_MEMES = 'MemesDB'
let gMemesDB

let isSecLine = true
let gMeme = {
	selectedImgId: 0,
	selectedLineIdx: 0,
	lines: [
		{
			txt: 'Insert Your text here...',
			size: 40,
			align: 'center',
			pos: {
				x: 250,
				y: 50,
			},
			fontFam: 'impact',
			fillC: '#ffffff',
			strokeC: '#000000',
			isDrag: false,
		},
	],
}

function getMeme() {
	return gMeme
}

function setImg(imgId) {
	gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
	if (gMeme.selectedLineIdx < 0) return
	getSelectedLine().txt = txt
}

function setColor(color) {
	if (gMeme.selectedLineIdx < 0) return
	getSelectedLine().fillC = color
}

function setFontSize(value) {
	const currLine = getSelectedLine()
	currLine.size = value
}

function switchLine(lineIdx) {
	if (lineIdx || lineIdx === 0) gMeme.selectedLineIdx = lineIdx
	else gMeme.selectedLineIdx = gMeme.selectedLineIdx === gMeme.lines.length - 1 ? 0 : gMeme.selectedLineIdx + 1
}

function setFontFamily(fontFam) {
	if (gMeme.selectedLineIdx < 0) return
	getSelectedLine().fontFam = fontFam
}

function setAlign(align) {
	if (gMeme.selectedLineIdx < 0) return
	if (gMeme.lines[gMeme.selectedLineIdx].align === align) return
	getSelectedLine().align = align
	let x
	if (align === 'left') x = 10
	else if (align === 'center') x = gElCanvas.width / 2
	else if (align === 'right') x = gElCanvas.width - 10
	getSelectedLine().pos.x = x
  showModal('success', `Text align changed to ${align}`)

}

function addLine(txt = '*meme text*') {
	const line = {
		txt,
		size: 40,
		align: 'center',
		pos: {
			x: gElCanvas.width / 2,
			y: gElCanvas.height / 2,
		},
		fontFam: 'impact',
		fillC: '#ffffff',
		strokeC: '#000000',
		isDrag: false,
	}
	if (isSecLine) line.pos.y = gElCanvas.height - 50
	isSecLine = false
	gMeme.lines.push(line)
	switchLine(gMeme.lines.length - 1)
}

function deleteLine() {
	if (gMeme.selectedLineIdx < 0) return
	if (!getSelectedLine()) return
	gMeme.lines.splice(gMeme.selectedLineIdx, 1)
	if (!gMeme.lines.length) gMeme.selectedLineIdx = -1
}

// Test
function isLineClicked(clickedPos) {
	const meme = getMeme()

	const clickedIndex = meme.lines.findIndex((line) => {
		gElCtx.font = `${line.size}px ${line.fontFam}`
		const textWidth = gElCtx.measureText(line.txt).width
		const lineHeight = line.size + 20

		return (
			clickedPos.x > line.pos.x - textWidth / 2 &&
			clickedPos.x < line.pos.x + textWidth / 2 &&
			clickedPos.y > line.pos.y - lineHeight / 2 &&
			clickedPos.y < line.pos.y + lineHeight / 2
		)
	})

	return clickedIndex
}

function setLineDrag(isDrag) {
	if (gMeme.selectedLineIdx < 0) return
	getSelectedLine().isDrag = isDrag
}

function moveLine(dx, dy) {
	getSelectedLine().pos.x += dx
	getSelectedLine().pos.y += dy
}

function loadMemes() {
	gMemesDB = loadFromStorage(STORAGE_MEMES)
	if (!gMemesDB) gMemesDB = []
}

function saveMeme(MemeData) {
	gMemesDB.push(MemeData)
	saveToStorage(STORAGE_MEMES, gMemesDB)
}

function getMemesDB() {
	return gMemesDB
}

function resetMeme() {
	gMeme = {
		selectedImgId: 0,
		selectedLineIdx: -1,
		lines: []
	}
}

function deleteMeme(savedIdx) {
	gMemesDB.splice(savedIdx, 1)
	saveToStorage(STORAGE_MEMES, gMemesDB)
}

function getSelectedLine() {
	if (gMeme.selectedLineIdx < 0) return
	return gMeme.lines[gMeme.selectedLineIdx]
}

function setLinesPos(centerX) {
	gMeme.lines.forEach((line) => (line.pos.x = centerX))
}
