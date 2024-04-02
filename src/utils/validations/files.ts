import { AddDocuments } from '~/types'

export const filesValidation = (
  files: File[],
  validationData: AddDocuments
) => {
  let error
  if (files.some((file) => file.size > validationData.maxFileSize)) {
    error = validationData.fileSizeError
  }
  if (
    files.reduce((acc, file) => acc + file.size, 0) >
    validationData.maxAllFilesSize
  ) {
    error = validationData.allFilesSizeError
  }
  if (
    files.length > 0 &&
    !files.every((file) =>
      validationData.filesTypes.some((type) => file.type === type)
    )
  ) {
    error = validationData.typeError
  }
  if (
    files.some((file) => file.name.length > validationData.maxFileNameLength)
  ) {
    error = validationData.maxFileNameError
  }

  return error
}
