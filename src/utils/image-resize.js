export const imageResize = async (photoPath, { newHeight, newWidth }) => {
  return new Promise((resolve) => {
    const originalImage = new Image()
    originalImage.src = photoPath

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = newWidth
    canvas.height = newHeight

    originalImage.onload = () => {
      const originalWidth = originalImage.naturalWidth
      const originalHeight = originalImage.naturalHeight
      const { newX, newY, cutInHeight, cutInWidth } = calculatePhotoCut(
        originalWidth,
        originalHeight,
        newWidth,
        newHeight
      )
      ctx?.drawImage(
        originalImage,
        newX,
        newY,
        cutInWidth,
        cutInHeight,
        0,
        0,
        newWidth,
        newHeight
      )
      const newPicturePath = canvas.toDataURL('image/png', 1)

      resolve(newPicturePath)
    }
  })
}

export const calculatePhotoCut = (
  originalWidth,
  originalHeight,
  newWidth,
  newHeight
) => {
  let newX = 0
  let newY = 0
  let cutInHeight = originalHeight
  let cutInWidth = originalWidth

  if (originalWidth < originalHeight) {
    cutInHeight = (originalWidth / newWidth) * newHeight
    if (originalHeight > newHeight) {
      newY = (originalHeight - cutInHeight) / 2
    }
  }

  if (originalWidth > originalHeight) {
    cutInWidth = (originalHeight / newHeight) * newWidth
    if (originalWidth > newWidth) {
      newX = (originalWidth - cutInWidth) / 2
    }
  }

  return { newX, newY, cutInHeight, cutInWidth }
}
