import { render, screen, fireEvent } from '@testing-library/react'
import FileUploader from '~/components/file-uploader/FileUploader'

const buttonText = 'test'
const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })

describe('FileUploader test without files', () => {
  const upload = {
    dragStart: jest.fn(),
    dragLeave: jest.fn(),
    dragDrop: jest.fn(),
    addFiles: jest.fn(),
    deleteFile: jest.fn(),
    files:[],
    isDrag: false,
    error: null
  }
  
  beforeEach(() => {
    render(<FileUploader buttonText={ buttonText } upload={ upload } />)
  })

  it('should render button with upload icon', () => {
    const button = screen.getByText('test')
    const icon = screen.getByTestId('CloudUploadIcon')

    expect(icon).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should call drag-n-drop and call dragStart, dragLeave, dragDrop functions', () => {
    const container = screen.getByTestId('drop')
    fireEvent.dragStart(container, { dataTransfer: { files: [fakeFile] } })

    expect(upload.dragStart).toBeCalled()

    fireEvent.dragLeave(container, { dataTransfer: { files: [fakeFile] } })
    expect(upload.dragLeave).toBeCalled()

    fireEvent.drop(container, { dataTransfer: { files: [fakeFile] } })
    expect(upload.dragDrop).toBeCalled()
  })
})

describe('FileUploader with files', () => {
  const upload = {
    dragStart: jest.fn(),
    dragLeave: jest.fn(),
    dragDrop: jest.fn(),
    addFiles: jest.fn(),
    deleteFile: jest.fn(),
    files:[fakeFile],
    isDrag: true,
    error: 'error'
  }

  beforeEach(() => {
    render(<FileUploader buttonText={ buttonText } upload={ upload } />)
  })

  it('should render file name', () => {
    const fileName = screen.getByText('test-file.png')

    expect(fileName).toBeInTheDocument()
  })
  it('should call deleteFile', () => {
    const icon = screen.getByTestId('CloseIcon')
    fireEvent.click(icon)

    expect(upload.deleteFile).toBeCalled()
  })

  it('should render error text', () => {
    const error = screen.getByText('error')

    expect(error).toBeInTheDocument()
  })
})
