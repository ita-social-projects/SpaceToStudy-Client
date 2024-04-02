import { AddDocuments } from '~/types'

export const filesValidation = (
  files: File[],
  validationData: AddDocuments
): string | undefined => {
  if (isFileNameValid(files, validationData.maxFileNameLength)) {
    return validationData.maxFileNameError
  }

  if (isFileValid(files, validationData.filesTypes)) {
    return validationData.typeError
  }

  if (isSizeValid(files, validationData.maxFileSize)) {
    return validationData.fileSizeError
  }

  if (isSizeValid(files, validationData.maxAllFilesSize, true)) {
    return validationData.allFilesSizeError
  }
}

export const isFileNameValid = (files: File[], maxLength: number): boolean => {
  return files.some((file) => file.name.length > maxLength)
}

export const isFileValid = (
  files: File[],
  acceptedTypes: string[]
): boolean => {
  return (
    files.length > 0 &&
    !files.every((file) => acceptedTypes.some((type) => file.type === type))
  )
}

export const isSizeValid = (
  files: File[],
  maxSize: number,
  countAll: boolean = false
): boolean => {
  if (countAll) {
    return files.reduce((acc, file) => acc + file.size, 0) > maxSize
  }

  return files.some((file) => file.size > maxSize)
}
