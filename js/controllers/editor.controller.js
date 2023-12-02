'use strict'

const fontSizes = [10, 12, 11, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128]


function initEditor() {
  displayLinesCount()
  renderFontSize()
  renderFontFamilySelect()
}

function renderFontSize(){
   document.querySelector('.font-size').innerHTML = `
    <select name="font-size" id="font-size" onchange="onSetFontSize()">
      ${fontSizes.map(size => `<option value="${size}">${size}</option>`).join('')}
    </select>
  `
  }

function renderFontFamilySelect() {
  const fontSelect = document.querySelector('.font-family')
  console.log('fontSelect', fontSelect)

  // List of predefined web-safe fonts
  const availableFonts = [
    'Arial',
    'Helvetica',
    'Georgia',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Geneva',
    'Tahoma',
    'impact',
    // Add more fonts as needed
  ]

  // Create options and append them to the select element
  let fontOptionsHTML = availableFonts
    .map(font => `<option value="${font.toLowerCase()}">${font}</option>`)
    .join('')

  let fontSelectHTML = `
      <select name="font-family" id="font-family" onchange="onSetFontFamily(this.value)">
        ${fontOptionsHTML}
      </select>
  `

  fontSelect.innerHTML = fontSelectHTML
}

function onSetText(txt){
  setLineTxt(txt)
  renderMeme()
}

function onSetColor(color){
  setColor(color)
  renderMeme()
}

function onSetFontSize() {
  const size = document.getElementById('font-size').value
  setFontSize(size)
  renderMeme()
}

function onSwitchLine(){
  switchLine()
  displayLinesCount()
  renderMeme()
}

function onSetFontFamily(fontFamily){
  setFontFamily(fontFamily)
  renderMeme()
}

function onSetAlign(align){
  setAlign(align)
  renderMeme()
}

function onAddLine(){
  addLine()
  displayLinesCount()
  renderMeme()
}

function onDeleteLine(){
  deleteLine()
  displayLinesCount()
  renderMeme()
}

function onToggleStroke() {
  const meme = getMeme();
  const selectedLine = meme.lines[meme.selectedLineIdx];

  // Toggle the value of the stroke property
  selectedLine.stroke = !selectedLine.stroke;

  // Render the meme to reflect the changes
  renderMeme()
}

function onDownloadMeme(elLink){
  switchLine(-1)
  renderMeme()
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-meme.jpg'
}

function onUploadMeme() {
  switchLine(-1)
  renderMeme()
  uploadMeme()
}

function onSaveMeme() {
  switchLine(-1)
  renderMeme()
  const MemeData = gElCanvas.toDataURL()
  saveMeme(MemeData)
  navigateTo('saved')
  renderSaved()
}

function openColorPallete() {
  const colorInput = document.createElement('input')
  colorInput.type = 'color'

  colorInput.addEventListener('input', function() {
    onSetColor(colorInput.value)
  })

  colorInput.click()

}

function onShareMeme(){}

function displayLinesCount() {
  const linesCount = document.querySelector('.lines-count')
  linesCount.innerHTML = `${gMeme.selectedLineIdx + 1} / ${gMeme.lines.length} lines`
}