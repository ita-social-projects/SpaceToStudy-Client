import { fireEvent, screen, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'
import BecomeATutor from '~/containers/tutor-home-page/become-a-tutor/BecomeATutor'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'
import { imageResize } from '~/utils/image-resize'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

vi.mock('~/utils/image-resize')

const mockAxiosClient = new MockAdapter(axiosClient)

const userId = '63f5d0ebb'
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }

const mockState = {
  appMain: { userId: userId, loading: false }
}

describe('BecomeATutor test', () => {
  mockAxiosClient.onGet(`${URLs.users.get}/${userId}`).reply(200, { data: userDataMock })
  beforeEach(() => {
    window.URL.createObjectURL = vi.fn(() => 'image/png')
    renderWithProviders(
      <ModalProvider>
        <BecomeATutor />
      </ModalProvider>,
      { preloadedState: mockState }
    )
  })

  it('should render first tab', () => {
    const firstTab = screen.getByText(/becomeTutor.generalInfo.title/i)

    expect(firstTab).toBeInTheDocument()
  })

  it('should render second tab', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const secondTab = screen.getByText(/becomeTutor.categories.title/i)

    expect(secondTab).toBeInTheDocument()
  })

  it('should open photo render error after add wrong file size', async () => {
    const fakeFile = new File(['certificate'], 'test-file.png', { type: 'image/png' })
    Object.defineProperty(fakeFile, 'size', { value: 55_000_000 })

    const photo = screen.getByText(/becomeTutor.stepLabels.photo/i)
    fireEvent.click(photo)

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = screen.queryByText('becomeTutor.photo.fileSizeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })

  it('should resize and show photo after adding photo', async () => {
    imageResize.mockImplementation(() => Promise.resolve('image.png'))
    const fakeFile = new File(['certificate'], 'test-file.png', { type: 'image/png' })
    Object.defineProperty(fakeFile, 'size', { value: 9_000_000 })

    const photo = screen.getByText(/becomeTutor.stepLabels.photo/i)
    fireEvent.click(photo)

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const photoPreview = await screen.findByAltText('becomeTutor.photo.imageAlt')
    await waitFor(() => expect(photoPreview).toBeInTheDocument())
  })
})
