import { AddDocuments } from '~/types'

export const filesValidation = (
  files: File[],
  validationData: AddDocuments
): string | undefined => {
  if (!isFileNameValid(files, validationData.maxFileNameLength)) {
    return validationData.maxFileNameError
  }

  if (!isFilesAmountValid(files, validationData.maxQuantityFiles)) {
    return validationData.quantityError
  }

  if (!isFileValid(files, validationData.filesTypes)) {
    return validationData.typeError
  }

  if (!isSizeValid(files, validationData.maxFileSize)) {
    return validationData.fileSizeError
  }

  if (!isSizeValid(files, validationData.maxAllFilesSize, true)) {
    return validationData.allFilesSizeError
  }
}

export const isFileNameValid = (files: File[], maxLength: number): boolean => {
  return files.every((file) => file.name.length < maxLength)
}

export const isFileValid = (
  files: File[],
  acceptedTypes: string[]
): boolean => {
  return files.every((file) => acceptedTypes.some((type) => file.type === type))
}

export const isSizeValid = (
  files: File[],
  maxSize: number,
  countAll: boolean = false
): boolean => {
  if (countAll) {
    return files.reduce((acc, file) => acc + file.size, 0) <= maxSize
  }

  return files.every((file) => file.size <= maxSize)
}

export const isFilesAmountValid = (
  files: File[],
  maxAmount: number
): boolean => {
  return files.length <= maxAmount
}
