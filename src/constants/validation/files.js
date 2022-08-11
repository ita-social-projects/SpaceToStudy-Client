export const certificates = (files) => {
  let error
  if (files.some(file => file.size > 10_000_000)) {
    error = 'becomeTutor.documents.fileSizeError'
  }
  if (files.reduce((acc, file) => acc + file.size, 0) > 50_000_000) {
    error = 'becomeTutor.documents.allFilesSizeError'
  }
  if ((files.length > 0) &&
    (files.some(file => file.type !== 'application/pdf' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png'))) {
    error = 'becomeTutor.documents.typeError'
  } else {
    error = null
  }
  
  return error
}
