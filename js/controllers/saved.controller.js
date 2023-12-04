'use strict'

function initSaved() {
  loadMemes()
  renderSaved()
}

function renderSaved() {
  const memesDB = getMemesDB()
  
  let savedHTMLs = []
  if (!memesDB.length) savedHTMLs = ['<p>No saved photos to show</p>']
  else savedHTMLs = memesDB.map((memeData, i) => `
  <div class="gallery-img" onclick="showModal('error', 'This feature is coming soon..')">
  <img src="${memeData}" > 
  <button class="delete-saved-btn" onclick="onDeleteSaved(${i})"><i class="fa-solid fa-trash-can"></i></button>
  </div>`)

  // onclick="onOpenSaved(this.src)"
  document.querySelector('.saved-container').innerHTML = savedHTMLs.join('')
}

function onOpenSaved(savedSrc) {
  gMeme.selectedImgId = savedSrc
  resetMeme()
  onSelectImg(0)
}

function onDeleteSaved(savedIdx) {
  if (!confirm('Are you sure you want to delete this Meme?')) return
  deleteMeme(savedIdx)
  renderSaved()
}