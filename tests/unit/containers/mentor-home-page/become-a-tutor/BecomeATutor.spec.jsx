import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BecomeATutor from '~/containers/tutor-home-page/become-a-tutor/BecomeATutor'
import { ModalProvider } from '~/context/modal-context'
import { imageResize } from '~/utils/image-resize'
import { vi } from 'vitest'
import { describe, it, expect, beforeEach } from 'vitest'

vi.mock('~/utils/image-resize')

describe('BecomeATutor test', () => {
  beforeEach(() => {
    window.URL.createObjectURL = vi.fn(() => 'image/png')
    render(
      <ModalProvider>
        <BecomeATutor />
      </ModalProvider>
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
