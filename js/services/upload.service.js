
function uploadMeme() {
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg")
  doUploadImg(imgDataUrl, onSuccess)

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
      // return false
  }
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
  })
      .then(res => res.text())
      .then((url) => {
          onSuccess(url)
      })
      .catch((err) => {
          console.error(err)
      })
}