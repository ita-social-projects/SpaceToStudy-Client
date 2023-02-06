import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

const closeModal = vi.fn()
const closeModalAfterDelay = vi.fn()
const setFullScreen = vi.fn()

const props = {
  content: 'test',
  closeModal,
  closeModalAfterDelay,
  timerId: null,
  isFullScreen: true,
  setFullScreen
}


vi.mock("~/hooks/use-confirm", () => {
  return {
    default: () => ({checkConfirmation: () => true})
  }
})

describe('Popup dialog test', () => {
  beforeEach(() => {
    render(<PopupDialog { ...props } />)
  })

  it('should have content text', () => {
    const content = screen.getByText(props.content)

    expect(content).toBeInTheDocument()
  })

  it('should close popup', async () => {
    const closeButton = screen.getByTestId('CloseIcon')
    fireEvent.click(closeButton)

    await waitFor(() => expect(closeModal).toHaveBeenCalled())
  })
})

describe('Popup dialog test with timerId', () => {
  const propsWithTimerId = { ...props, timerId: 21 }
  beforeEach(() => {
    render(<PopupDialog { ...propsWithTimerId } />)
  })

  it('should close popup after delay', async () => {
    const popupContent = screen.getByTestId('popupContent')

    fireEvent.mouseEnter(popupContent)
    fireEvent.mouseLeave(popupContent)

    await waitFor(() => expect(closeModalAfterDelay).toHaveBeenCalled())
  })
})
