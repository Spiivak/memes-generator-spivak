'use strict'



function initEditor() {
  displayLinesCount()
  renderFontSize()
  renderFontFamilySelect()
}

function renderFontSize(){
  const fontSizes = [10, 12, 11, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128]

   document.querySelector('.font-size').innerHTML = `
   <select name="font-size" id="font-size" onchange="onSetFontSize()">
   ${fontSizes.map(size => `<option value="${size}">${size}</option>`).join('')}
   </select>
   `
  }
  
  function renderFontFamilySelect() {
    const fontSelect = document.querySelector('.font-family')

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
  ]

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
  document.querySelector('.new-text-box').value = getSelectedLine().txt
  renderMeme()
}

function onSetColor(color){
  setColor(color)
  renderMeme()
}

function onSetFontSize() {
  const size = document.getElementById('font-size').value
  showModal('success', `Font size changed to ${size}px`)
  setFontSize(size)
  renderMeme()
}

function onSwitchLine(){
  switchLine()
  document.querySelector('.new-text-box').value = getSelectedLine().txt
  
  displayLinesCount()
  renderMeme()
  // showModal('success', `Switched to line ${getSelectedLineIdx() + 1}`)
}

function onSetFontFamily(fontFamily){
  setFontFamily(fontFamily)
  renderMeme()
  showModal('success', `Font Family changed to ${fontFamily}`)
}

function onSetAlign(align){
  setAlign(align)
  renderMeme()
}

function onAddLine(){
  addLine()
  showModal('success', `Successfully added a new line`)
  displayLinesCount()
  document.querySelector('.new-text-box').value = getSelectedLine().txt
  renderMeme()
}

function onDeleteLine(){
  deleteLine()
  showModal('success', `Successfully deleted a line`)
  displayLinesCount()
  renderMeme()
}

function onToggleStroke() {
  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]

  selectedLine.stroke = !selectedLine.stroke

  if (!selectedLine.stroke) {
    showModal('success', `Added Stroke`)
  } else {

    showModal('success', `Removed Stroke`)
  }


  renderMeme()
}

function onDownloadMeme(elLink){
  switchLine(-1)
  renderMeme()
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-meme.jpg'
  showModal('success', `Successfully downloaded the meme`)
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
  showModal('success', `Successfully saved the meme`)
  navigateTo('saved')
  renderSaved()
}

function openColorPallete() {
  const colorInput = document.createElement('input')
  colorInput.type = 'color'

  colorInput.addEventListener('input', function() {
    onSetColor(colorInput.value)
    showModal('success', `Successfully changed the color`)
  })

  colorInput.click()

}

function onShareMeme(){}

function displayLinesCount() {
  const linesCount = document.querySelector('.lines-count')
  linesCount.innerHTML = `${gMeme.selectedLineIdx + 1} / ${gMeme.lines.length} lines`
}