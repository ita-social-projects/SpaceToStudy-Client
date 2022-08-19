export const filesValidation = (files, maxFileSize, maxAllFilesSize, filesTypes) => {
  let error
  if (files.some(file => file.size > maxFileSize)) {
    error = 'becomeTutor.documents.fileSizeError'
  }
  if (files.reduce((acc, file) => acc + file.size, 0) > maxAllFilesSize) {
    error = 'becomeTutor.documents.allFilesSizeError'
  }
  if ((files.length > 0) &&
     !files.every((file) => filesTypes.some((type) => file.type === type))) {
    error = 'becomeTutor.documents.typeError'
  }
  
  return error
}
