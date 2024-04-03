import { AddDocuments } from '~/types'

export const validationData: AddDocuments = {
  maxFileSize: 5_000_000,
  maxAllFilesSize: 20_000_000,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  fileSizeError: 'common.fileSizeError',
  allFilesSizeError: 'common.allFilesSizeError',
  typeError: 'common.typeError',
  maxQuantityFiles: 7,
  quantityError: 'common.quantityError',
  maxFileNameLength: 55,
  maxFileNameError: 'common.fileNameError'
}
