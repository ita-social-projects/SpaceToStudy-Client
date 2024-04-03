import { expect } from 'vitest'
import { filesValidation } from '~/utils/validations/files'

const mockedValidation = {
  maxFileSize: 5_000_000,
  maxAllFilesSize: 20_000_000,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  fileSizeError: 'common.fileSizeError',
  allFilesSizeError: 'common.allFilesSizeError',
  typeError: 'common.typeError',
  maxQuantityFiles: 7,
  maxFileNameLength: 55,
  maxFileNameError: 'common.fileNameError'
}

const tooLongNameFile = [
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.jpg',
    size: 26715,
    type: 'image/jpeg',
    webkitRelativePath: ''
  }
]

const tooBigFile = [
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_002,
    type: 'image/jpeg',
    webkitRelativePath: ''
  }
]

const wrongTypeFile = [
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/bmp',
    webkitRelativePath: ''
  }
]

const overallSizeTooBig = [
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/jpeg',
    webkitRelativePath: ''
  },
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/jpeg',
    webkitRelativePath: ''
  },
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/jpeg',
    webkitRelativePath: ''
  },
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/jpeg',
    webkitRelativePath: ''
  },
  {
    lastModified: 1676387080931,
    lastModifiedDate: new Date(),
    name: 'wwwwwwwwwwwwwwwww.jpg',
    size: 5_000_000,
    type: 'image/jpeg',
    webkitRelativePath: ''
  }
]

describe('filesValidation', () => {
  it('Should return error that file name too long', () => {
    const resultMessage = filesValidation(tooLongNameFile, mockedValidation)
    expect(resultMessage).toBe(mockedValidation.maxFileNameError)
  })

  it('Should return error that file size too big', () => {
    const resultMessage = filesValidation(tooBigFile, mockedValidation)
    expect(resultMessage).toBe(mockedValidation.fileSizeError)
  })

  it('Should return error that file type is incompatible', () => {
    const resultMessage = filesValidation(wrongTypeFile, mockedValidation)
    expect(resultMessage).toBe(mockedValidation.typeError)
  })

  it('Should return error that overall files size is too big', () => {
    const resultMessage = filesValidation(overallSizeTooBig, mockedValidation)
    expect(resultMessage).toBe(mockedValidation.allFilesSizeError)
  })
})
