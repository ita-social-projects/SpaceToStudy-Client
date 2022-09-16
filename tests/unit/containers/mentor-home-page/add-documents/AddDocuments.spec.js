import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'

const addDocuments = jest.fn()
const documents = []
const documentsError = undefined
const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)
const setStepErrors = jest.fn()

describe('AddDocuments test', () => {
  beforeEach(() => {
    render(
      <AddDocuments
        addDocuments={ addDocuments }
        btnsBox={ btnsBox }
        documents={ documents }
        documentsError={ documentsError }
        setStepErrors={ setStepErrors }
      />
    )
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

  it('should render error text after add wrong file type', async () => {
    const fakeFile = new File(['certificate'], 'test-file.js', { type: 'text/javascript' })

    const input = screen.getByLabelText('becomeTutor.documents.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = { error: 'becomeTutor.documents.typeError', files: [] }

    await waitFor(() => expect(addDocuments).toHaveBeenCalledWith(error))
  })

  it('should render error after add wrong file size', async () => {
    const fakeFile = new File(['certificate'], 'test-file.png', { type: 'image/png' })
    Object.defineProperty(fakeFile, 'size', { value: 15_000_000 })

    const input = screen.getByLabelText('becomeTutor.documents.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = {
      error: 'becomeTutor.documents.fileSizeError',
      files: []
    }

    await waitFor(() => expect(addDocuments).toHaveBeenCalledWith(error))
  })
})
