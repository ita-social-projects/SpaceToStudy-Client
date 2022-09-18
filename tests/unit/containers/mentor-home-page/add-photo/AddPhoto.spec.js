import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddPhoto from '~/containers/mentor-home-page/add-photo/AddPhoto'

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)
const dataMock = {
  photo: []
}
const errorsMock = {
  photo: null
}
const handleStepErrors = jest.fn()
const handleAddFiles = jest.fn()
const handleErrors = jest.fn()

describe('AddPhoto test', () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(() => 'image/png')
    render(
      <AddPhoto
        btnsBox={ btnsBox }
        data={ dataMock }
        errors={ errorsMock }
        handleAddFiles={ handleAddFiles }
        handleErrors={ handleErrors }
        handleStepErrors={ handleStepErrors }
      />
    )
  })

  it('should render placeholder', () => {
    const placeholder = screen.getByText('becomeTutor.photo.placeholder')

    expect(placeholder).toBeInTheDocument()
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

    await waitFor(() => expect(handleErrors).toHaveBeenCalledWith('photo', 'becomeTutor.photo.typeError'))
  })
})
describe('AddPhoto test with image and error', () => {
  const dataMockWithImage = {
    photo: [{ src: 'image.png' }]
  }
  const errorsMockWithError = {
    photo: 'becomeTutor.photo.fileSizeError'
  }

  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(() => 'image/png')
    render(
      <AddPhoto
        btnsBox={ btnsBox }
        data={ dataMockWithImage }
        errors={ errorsMockWithError }
        handleAddFiles={ handleAddFiles }
        handleErrors={ handleErrors }
        handleStepErrors={ handleStepErrors }
      />
    )
  })
  it('should show photoPrewiew', async () => {
    const photoPreview = screen.getByAltText('becomeTutor.photo.imageAlt')

    await waitFor(() => expect(photoPreview).toBeInTheDocument())
  })
  it('should delete photo after ckicking on delete button', async () => {
    const remove = screen.getByTestId('delete-file')
    fireEvent.click(remove)

    await waitFor(() => expect(handleAddFiles).toBeCalled())
  })
  it('should show error', async () => {
    const error = screen.queryByText('becomeTutor.photo.fileSizeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })
})
