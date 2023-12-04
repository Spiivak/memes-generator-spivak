'use strict'

function initGallery(){
  createKeywordsList()
  renderKeywords()
  renderGallery()
}


function renderGallery(keyword) {
  // document.querySelector('.aside-nav-list')
  const imgs = getImagesToShow(keyword)

  let imgsHTMLs = imgs.map(img => {
    return `<img class="gallery-img" src="assets/images/memes/${img.id}.jpg" onclick="onSelectImg(${img.id})">`
  })


  if (!imgs.length) imgsHTMLs = ['<p>No results found...</p>']
  imgsHTMLs.unshift(`<div class="upload-card file-input flex justify-center align-center">
  <button onclick="showModal('error', 'This feature is coming soon..')" class="upload-image"><i class="fa-solid fa-plus"></i></button>
</div>`)

  document.querySelector('.gallery-layout').innerHTML = imgsHTMLs.join('')
  document.querySelector('.search-box').placeholder = `Search ${imgs.length} memes`

  if (!keyword) document.querySelector('.search-box').value = ''

}


function renderKeywords() {
  const keywordsSet = getKeywords()
  let datalistHTMLs = '<select onchange="onKeyword(this.value)"><option value="">All</option>'

  keywordsSet.forEach(keyword => {
    datalistHTMLs += `<option value="${keyword.name.toLowerCase()}">${keyword.name}</option>`
  })

  datalistHTMLs += '</select>'

  document.querySelector('.categories').innerHTML = datalistHTMLs
}

function onKeyword(keyword) {
  updateKeywordCount(keyword)
  document.querySelector('.search-box').value = keyword
  renderGallery(keyword)
}

function onSelectImg(imgId) {
  navigateTo('editor')
  initMeme(imgId)
  addLine()
}

function onImgInput(ev) {
  loadImageFromInput(ev, DrawUploadedImg)
}
function DrawUploadedImg(img) {
  onImgSelect(0)
  drawImageOnCanvas(img)
}

function drawImageOnCanvas(img) {
  gElCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gElCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  navigateTo('editor')
  renderMeme()
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}
