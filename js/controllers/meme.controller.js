'use strict'

let gElCanvas
let gElCtx
let gStartPos
const gTouchEvs = ['touchmove', 'touchend', 'touchstart']
const gStickers = ['💙', '😂', '😎', '😍', '👌🏼', '🤙🏼', '💪🏼', '👄']
let gStickersIdx = 0
let gAspectRatio = 1

function initMeme(imgId) {

  gElCanvas = document.querySelector('canvas')
  gElCtx = gElCanvas.getContext('2d')
  gElCanvas.width = 500
  gElCanvas.height = 500
  addEventListeners()
  setImg(imgId)
  onLoadMeme()
  
  // resizeCanvas()
  // window.addEventListener('resize', () => resizeCanvas())
}

function setCanvasHeight(imgId) {
  const elTestImg = document.querySelector('.test-img')
  elTestImg.style.display = 'inline'
  if (imgId) {
    const imgSrc = getElImgById(imgId).src
    elTestImg.src = imgSrc
  }

  const imgWidth = elTestImg.offsetWidth
  const imgHeight = elTestImg.offsetHeight
  const CanvasHeight = (imgHeight * 500) / imgWidth
  gElCanvas.height = CanvasHeight
  elTestImg.style.display = 'none'
  gAspectRatio = imgWidth / imgHeight
}

function addEventListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}

function setLineSize(size) {
  const currLine = getSelectedLine()
  currLine.size = size
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const clickedLineIdx = isLineClicked(pos)

  console.log('onDown: pos', pos, 'clickedLineIdx', clickedLineIdx)

  if (clickedLineIdx < 0) {
    switchLine(clickedLineIdx)
    renderMeme()
    return
  }

  switchLine(clickedLineIdx)
  setLineDrag(true)
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
  renderMeme()
}

function onMove(ev) {
  const line = getSelectedLine()
  if (!line || !line.isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y

  console.log('onMove: pos', pos, 'dx', dx, 'dy', dy)

  moveLine(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  // console.log('Up')
  gElCanvas.style.cursor = 'grab'
  renderMeme()
}

function onLoadMeme() {
  const meme = getMeme()
  const image = new Image()
  image.src = `assets/images/memes/${meme.selectedImgId}.jpg`
  image.onload = () => {
    renderMeme()
  }
}


function renderMeme() {
  const meme = getMeme()
  let elImg = getElImgById(meme.selectedImgId)
  if (!meme.selectedImgId) elImg = document.querySelector('.test-img')

  gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gElCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  if (meme.lines.length) {
    meme.lines.forEach((line, i) => {
      drawLine(line)
      if (i === meme.selectedLineIdx && meme.selectedLineIdx >= 0) markSelectedLine(meme.lines[meme.selectedLineIdx])
    })
  }
}

function drawLine({ pos: { x, y }, txt, size, fontFam, fillC, strokeC, align, stroke=false }) {
  gElCtx.textBaseline = 'middle'
  gElCtx.textAlign = align

  gElCtx.font = `${size}px ${fontFam}`
  gElCtx.fillStyle = fillC

  if (!stroke) {
    gElCtx.lineWidth = 4
    gElCtx.strokeStyle = strokeC
    gElCtx.strokeText(txt, x, y)
  }

  gElCtx.fillText(txt, x, y)
}

function getFontMetrics(ctx) {
  const font = ctx.font
  const textMetrics = ctx.measureText('M')
  return {
    ascent: textMetrics.actualBoundingBoxAscent,
    descent: textMetrics.actualBoundingBoxDescent,
  }
}

function markSelectedLine(line) {
  const { pos: { x, y }, size, txt, align } = line
  const fontMetrics = getFontMetrics(gElCtx)
  const lineHeight = fontMetrics.ascent + fontMetrics.descent + 20
  const lineWidth = gElCtx.measureText(txt).width

  gElCtx.beginPath()

  if (align === 'left') {
    gElCtx.rect(x, y - lineHeight / 2, lineWidth, lineHeight)
  } else if (align === 'center') {
    gElCtx.rect(x - lineWidth / 2, y - lineHeight / 2, lineWidth, lineHeight)
  } else if (align === 'right') {
    gElCtx.rect(x - lineWidth, y - lineHeight / 2, lineWidth, lineHeight)
  }

  gElCtx.lineWidth = 2
  gElCtx.strokeStyle = 'rgb(15, 155, 180)'
  gElCtx.stroke()
  gElCtx.closePath()
}


// function renderLineValues(line) {
//   const propsToIgnore = ['size', 'align', 'pos', 'isDrag']
//   console.log(line)
//   Object.keys(line).forEach((prop) => {
//     if (!propsToIgnore.includes(prop)) {
//       console.log(prop)
//        document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop]
//     }
//   })
// }

function getElImgById(imgId) {
  return document.querySelector(`[src="assets/images/memes/${imgId}.jpg"]`)
}

function resizeCanvas() {
   var elContainer = document.querySelector('.canvas-container')
   gElCanvas.width = elContainer.offsetWidth
   gElCanvas.height = gElCanvas.width
   setLinesPos(gElCanvas.width/2)
   renderMeme()
}

function getEvPos(ev) {
  var pos = {
     x: ev.offsetX,
     y: ev.offsetY
  }
  if (gTouchEvs.includes(ev.type)) {
     ev.preventDefault()
     var rect = ev.target.getBoundingClientRect()
     var x = ev.targetTouches[0].pageX - rect.left
     var y = ev.targetTouches[0].pageY - rect.top
     pos = { x, y }
  }
  return pos
}