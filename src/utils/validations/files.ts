import { AddDocuments } from '~/types'

export const filesValidation = (
  files: File[],
  validationData: AddDocuments
): string | undefined => {
  if (isFileNameInvalid(files, validationData.maxFileNameLength)) {
    return validationData.maxFileNameError
  }

  if (isFilesAmountInvalid(files, validationData.maxQuantityFiles)) {
    return validationData.quantityError
  }

  if (isFileInvalid(files, validationData.filesTypes)) {
    return validationData.typeError
  }

  if (isSizeInvalid(files, validationData.maxFileSize)) {
    return validationData.fileSizeError
  }

  if (isSizeInvalid(files, validationData.maxAllFilesSize, true)) {
    return validationData.allFilesSizeError
  }
}

export const isFileNameInvalid = (
  files: File[],
  maxLength: number
): boolean => {
  return files.some((file) => file.name.length > maxLength)
}

export const isFileInvalid = (
  files: File[],
  acceptedTypes: string[]
): boolean => {
  return !files.every((file) =>
    acceptedTypes.some((type) => file.type === type)
  )
}

export const isSizeInvalid = (
  files: File[],
  maxSize: number,
  countAll: boolean = false
): boolean => {
  if (countAll) {
    return files.reduce((acc, file) => acc + file.size, 0) > maxSize
  }

  return files.some((file) => file.size > maxSize)
}

export const isFilesAmountInvalid = (
  files: File[],
  maxAmount: number
): boolean => {
  return files.length > maxAmount
}
