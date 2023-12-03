'use strict'


function onInit() {
  initGallery()
  initSaved()
  initEditor()
}
const pages = ['gallery', 'about', 'editor', 'saved']

// function navigateTo(toPage) {
//   pages.forEach(page => {
//     const pageContainer = document.querySelector(`.${page}-container`)
//     const pageLink = document.querySelector(`.${page}-page`)

//     if (pageContainer && pageLink) {
//       console.log('Toggling classes...')
//       pageContainer.classList.toggle('hide', page !== toPage)
//       pageLink.classList.toggle('active', page === toPage)

//       // Show/hide the aside container based on the current page
//       if (toPage === 'gallery') {
//         resetMeme()
//         asideContainer.classList.remove('hide')
//       } else {
//         asideContainer.classList.add('hide')
//       }
//     }
//   })
// }

function navigateTo(toPage) {
  pages.forEach(page => {
    const container = document.querySelector(`.${page}-container`)
    const pageLink = document.querySelector(`.${page}-page`)

    if (container && pageLink) {
      container.classList.toggle('hide', page !== toPage)
      pageLink.classList.toggle('active', page === toPage)
    } else {
      console.error(`Element with class '${page}-container' or '${page}-page' not found.`)
    }
  })
}

function toggleTheme() {
  const elToggle = document.querySelector(".toggle-theme")

  var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  if (!storedTheme) {
    storedTheme = "light"
    localStorage.setItem('theme', storedTheme)
  }

  // Set the theme to the opposite of the current theme
  var targetTheme = storedTheme === "light" ? "dark" : "light"

  document.body.setAttribute('data-theme', targetTheme)
  localStorage.setItem('theme', targetTheme)
}


// Function to show modal
function showModal(type, message) {
  const modalContainer = document.getElementById('modalContainer')
  const totalHeight = Array.from(modalContainer.children).reduce(
    (acc, modal) => acc + modal.offsetHeight + 10, 0)

  if (modalContainer.children.length >= 5) {
    modalContainer.removeChild(modalContainer.firstChild)
  }

  const modal = document.createElement('div')
  modal.className = `modal ${type}`
  modal.innerHTML = `
    <span>${message}</span>
    <span class="modal-close" onclick="closeModal(this.parentNode)">X</span>
  `

  modalContainer.appendChild(modal)

  setTimeout(() => {
    modal.style.opacity = '1'
    modal.style.transform = `translateY(-${modal.offsetHeight}px)`
  }, 0)

  setTimeout(() => {
    closeModal(modal)
  }, 5000)
}


// Function to close a modal
function closeModal(modal) {
  modal.style.opacity = '0'
  modal.style.transform = 'translateY(100%)'

  setTimeout(() => {
    modal.remove()
  }, 300)
}



