'use strict'

function saveToStorage(key, val) {
   localStorage.setItem(key, JSON.stringify(val))
}


function loadFromStorage(key) {
   var val = localStorage.getItem(key)
   try {
      return JSON.parse(val) || null
   } catch (error) {
      console.error(`Error parsing data from storage: ${error.message}`)
      return null
   }
}