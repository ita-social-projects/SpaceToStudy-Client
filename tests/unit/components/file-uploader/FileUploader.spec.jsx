import { render, screen, fireEvent } from '@testing-library/react'
import FileUploader from '~/components/file-uploader/FileUploader'
import { vi } from 'vitest'

const buttonText = 'test'
const emitter = vi.fn()
const initialState = []
const initialError = ''
const validationData = {
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
const fakeFile = new File(['certificate'], 'test-file.png', {
  type: 'application/pdf'
})

describe('FileUploader test', () => {
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={buttonText}
        emitter={emitter}
        initialError={initialError}
        initialState={initialState}
        isImages
        validationData={validationData}
      />
    )
  })

  it('should render button with upload icon', () => {
    const button = screen.getByText('test')
    const icon = screen.getByTestId('CloudUploadIcon')

    expect(icon).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})

describe('FileUploader test with file', () => {
  const initialState = [fakeFile]
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={buttonText}
        emitter={emitter}
        initialError={initialError}
        initialState={initialState}
        isImages
        validationData={validationData}
      />
    )
  })
  it('should delete file after uploading', () => {
    const remove = screen.getByTestId('delete-file')
    fireEvent.click(remove)
    const newState = { error: '', files: [] }

    expect(emitter).toHaveBeenCalledWith(newState)
  })
})
