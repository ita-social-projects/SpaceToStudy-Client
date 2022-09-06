import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import AddPhoto from '~/containers/mentor-home-page/add-photo/AddPhoto'

const photo = []
const photoError = undefined
const addPhoto = jest.fn()
const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)
const setStepErrors = jest.fn()

describe('AddPhoto test', () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(() => 'image/png')
    render(
      <AddPhoto
        addPhoto={ addPhoto }
        btnsBox={ btnsBox }
        photo={ photo }
        photoError={ photoError }
        setStepErrors={ setStepErrors }
      />
    )
  })
  afterEach(() => cleanup())

  it('should render placeholder', () => {
    const image = screen.getByText('becomeTutor.photo.placeholder')

    expect(image).toBeInTheDocument()
  })

  it('should render description', () => {
    const text = screen.getByText('becomeTutor.photo.description')

    expect(text).toBeInTheDocument()
  })

  it('should render back and next buttons', () => {
    const buttonBack = screen.getByText('back')
    const buttonNext = screen.getByText('next')

    expect(buttonBack).toBeInTheDocument()
    expect(buttonNext).toBeInTheDocument()
  })

  it('should render error text after add wrong file type', async () => {
    const fakeFile = new File(['photo'], 'test-file.pdf', { type: 'application/pdf' })

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = screen.queryByText('becomeTutor.photo.typeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })
})
