import {  render, screen } from '@testing-library/react'
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

describe('AddDocuments test', () => {
  beforeEach(() => {
    render(
      <AddDocuments
        addDocuments={ addDocuments }
        btnsBox={ btnsBox }
        documents={ documents }
        documentsError={ documentsError }
      />)
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
})
