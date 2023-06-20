import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import useBreakpoints from '~/hooks/use-breakpoints'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

import { imageResize } from '~/utils/image-resize'
import { URLs } from '~/constants/request'

vi.mock('~/utils/image-resize')
vi.mock('~/hooks/use-breakpoints')

const userId = '63f5d0ebb'
const userRole = 'admin'
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }

const mockState = {
  appMain: { userId, userRole, loading: false }
}

mockAxiosClient
  .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
  .reply(200, { data: userDataMock })
const desktopData = {
  isLaptopAndAbove: true,
  isMobile: false,
  isTablet: false
}

describe('UserStepsWrapper test', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    window.URL.createObjectURL = vi.fn(() => 'image/png')
    renderWithProviders(<UserStepsWrapper userRole='tutor' />, {
      preloadedState: mockState
    })
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
    const fakeFile = new File(['certificate'], 'test-file.png', {
      type: 'image/png'
    })
    Object.defineProperty(fakeFile, 'size', { value: 55_000_000 })

    const photo = screen.getByText(/step.stepLabels.photo/i)
    fireEvent.click(photo)

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = screen.queryByText('becomeTutor.photo.fileSizeError')

    await waitFor(() => expect(error).toBeInTheDocument())
  })

  it('should resize and show photo after adding photo', async () => {
    imageResize.mockImplementation(() => Promise.resolve('image.png'))
    const fakeFile = new File(['certificate'], 'test-file.png', {
      type: 'image/png'
    })
    Object.defineProperty(fakeFile, 'size', { value: 9_000_000 })

    const photo = screen.getByText(/step.stepLabels.photo/i)
    fireEvent.click(photo)

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const photoPreview = await screen.findByAltText(
      'becomeTutor.photo.imageAlt'
    )
    await waitFor(() => expect(photoPreview).toBeInTheDocument())
  })
})
