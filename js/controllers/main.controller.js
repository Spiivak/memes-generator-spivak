'use strict'


function onInit() {
  initGallery()
  initSaved()
  initEditor()
}
const pages = ['gallery', 'about', 'editor', 'saved', 'aside']

function navigateTo(toPage) {
  pages.forEach(page => {
    const pageContainer = document.querySelector(`.${page}-container`)
    const pageLink = document.querySelector(`.${page}-page`)
    const asideContainer = document.querySelector('.aside-container')

    if (pageContainer && pageLink) {
      console.log('Toggling classes...')
      pageContainer.classList.toggle('hide', page !== toPage)
      pageLink.classList.toggle('active', page === toPage)

      // Show/hide the aside container based on the current page
      if (toPage === 'gallery') {
        resetMeme()
        asideContainer.classList.remove('hide')
      } else {
        asideContainer.classList.add('hide')
      }
    }
  })
}
    // function navigateTo(toPage) {
    //   if(toPage === 'editor') {
    //     document.querySelector('.aside').classList.add('hide')
    //     document.querySelector('.gallery').classList.add('hide')
    //     document.querySelector('.gallery-page').classList.remove('active')
    //     document.querySelector('.editor-page').classList.add('active')
    //     document.querySelector('.canvas-container').classList.remove('hide')
    //   }
    
    //   if(toPage ==='saved') {
    //     document.querySelector('.aside').classList.remove('hide')
    //     document.querySelector('.gallery').classList.add('hide')
    //     document.querySelector('.saved-page').classList.add('active')
    //     document.querySelector('.canvas-container').classList.add('hide')
    //   }
    
    //   if(toPage === 'gallery') {
    //     document.querySelector('.gallery-page').classList.add('active')
    //     document.querySelector('.aside').classList.remove('hide')
    //     document.querySelector('.gallery').classList.remove('hide')
    //     document.querySelector('.canvas-container').classList.add('hide')
    //   }
    // }