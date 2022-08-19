import { render, screen, fireEvent } from '@testing-library/react'
import FileUploader from '~/components/file-uploader/FileUploader'

const buttonText = 'test'
const emitter = jest.fn()
const initialState = []
const initialError = undefined
const fileTypes = ['application/pdf']
const maxAllFilesSize = 50_000
const maxFileSize = 10_000
const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })

describe('FileUploader test', () => {
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={ buttonText }
        emitter={ emitter }
        fileTypes={ fileTypes }
        initialError={ initialError }
        initialState={ initialState }
        maxAllFilesSize={ maxAllFilesSize }
        maxFileSize={ maxFileSize }
        maxQuantityFiles={ 5 }
      />)
  })

  it('should render button with upload icon', () => {
    const button = screen.getByText('test')
    const icon = screen.getByTestId('CloudUploadIcon')

    expect(icon).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should drop file', () => {
    const container = screen.getByTestId('drop')
    fireEvent.dragStart(container, { dataTransfer: { files: [fakeFile] } })
    fireEvent.drop(container, { dataTransfer: { files: [fakeFile] } })
    fireEvent.dragLeave(container)
    const fileName = screen.getByText('test-file.png')

    expect(fileName).toBeInTheDocument()
  })

  it('should delete file after uploading', () => {
    const container = screen.getByTestId('drop')
    fireEvent.drop(container, { dataTransfer: { files: [fakeFile] } })
    const icon = screen.getByTestId('CloseIcon')
    const fileName = screen.getByText('test-file.png')

    expect(fileName).toBeInTheDocument()

    fireEvent.click(icon)

    expect(fileName).not.toBeInTheDocument()
  })

})
