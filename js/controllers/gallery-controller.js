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
  <button class="upload-image"><i class="fa-solid fa-plus"></i></button>
</div>`)

  document.querySelector('.gallery-container').innerHTML = imgsHTMLs.join('')

  if (!keyword) document.querySelector('.search-line input').value = ''

}
function renderKeywords() {
   const keywordsSet = getKeywords()

   let datalistHTMLs = '<li class="all-btn" onclick="renderGallery()"><a>All</a></li>'
   let keywordsFilter = []

   keywordsSet.forEach(keyword => {
      datalistHTMLs += `<li onclick="onKeyword('${keyword.name}')"><a onclick="console.log(this)">${keyword.name}</a></li>`
      keywordsFilter.push(`<li onclick="onKeyword('${keyword.name}')"><a>${keyword.name}</a></li>`)
   })
   document.querySelector('.aside-nav-list').innerHTML = datalistHTMLs
}

function onKeyword(keyword) {
  updateKeywordCount(keyword)
  document.querySelector('.search-line input').value = keyword
  renderKeywords()
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
  document.querySelector('.test-img').src = img.src
  onImgSelect(0)
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