import {  render, screen } from '@testing-library/react'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'

const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })
const uploadCertificates = {
  dragStart: jest.fn(),
  dragLeave: jest.fn(),
  dragDrop: jest.fn(),
  addFiles: jest.fn(),
  deleteFile: jest.fn(),
  files:[fakeFile],
  isDrag: true,
  error: null
}
const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('AddDocuments test', () => {
  beforeEach(() => {
    render(<AddDocuments btnsBox={ btnsBox } uploadCertificates={ uploadCertificates } />)
  })

  it('should render imgage', () => {
    const image = screen.getByAltText('becomeTutor.documents.imageAlt')

    expect(image).toBeInTheDocument()
  })

  it('should render description', () => {
    const text = screen.getByText('becomeTutor.documents.description')

    expect(text).toBeInTheDocument()
  })

  it('should render back and next buttons', () => {
    const buttonBack = screen.getByText('back')
    const buttonNext = screen.getByText('next')

    expect(buttonBack).toBeInTheDocument()
    expect(buttonNext).toBeInTheDocument()
  })

  it('should render file uploader with file', () => {
    const button = screen.getByText('becomeTutor.documents.button')
    const fileName = screen.getByText('test-file.png')

    expect(button).toBeInTheDocument()
    expect(fileName).toBeInTheDocument()
  })
})
