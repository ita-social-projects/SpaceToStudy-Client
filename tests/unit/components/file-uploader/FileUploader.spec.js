import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FileUploader from '~/components/file-uploader/FileUploader'

const buttonText = 'test'
const validation = jest.fn()
const emitter = jest.fn()
const initialState = []
const initialError = undefined
const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })

describe('FileUploader test', () => {
  beforeEach(() => {
    render(
      <FileUploader
        buttonText={ buttonText }
        emitter={ emitter }
        initialError={ initialError }
        initialState={ initialState }
        maxQuantityFiles={ 5 }
        validation={ validation }
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
