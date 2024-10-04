import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import useBreakpoints from '~/hooks/use-breakpoints'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'

import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/hooks/use-breakpoints')

vi.stubGlobal('matchMedia', (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

const mockRef = {
  current: { focus: vi.fn(), setSelectionRange: vi.fn(), selectionStart: 5 }
}
const mockSetValue = vi.fn()
const mockOnClick = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useRef: () => vi.fn().mockReturnValue(mockRef)
  }
})

const props = {
  value: 'new message',
  label: 'Enter some text',
  setValue: mockSetValue,
  onClick: mockOnClick
}

describe('ChatTextArea component test', () => {
  const breakpointsData = { isMobile: false }
  beforeEach(async () => {
    await waitFor(() => {
      useBreakpoints.mockImplementation(() => breakpointsData)

      renderWithProviders(<ChatTextArea {...props} />)
    })
  })

  it('should render input with emoji icon', async () => {
    const input = screen.getByText('Enter some text')
    const emojiIcon = screen.getByTestId('MoodIcon')

    expect(input).toBeInTheDocument()
    expect(emojiIcon).toBeInTheDocument()
  })

  it('should toggle emoji picker', async () => {
    const emojiIcon = screen.getByTestId('MoodIcon')

    fireEvent.click(emojiIcon)

    const picker = screen.getByTestId('emoji-picker')

    expect(picker).toBeInTheDocument()
  })

  it('should send new message and clear input', async () => {
    const user = userEvent.setup()

    const input = screen.getByLabelText('Enter some text')

    // await waitFor(() => user.type(input, 'new message'))
    await user.type(input, 'new message')

    expect(input.value).toBe('new message')

    const sendBtn = screen.getByTestId('SendIcon')

    fireEvent.click(sendBtn)

    expect(mockOnClick).toHaveBeenCalled()
  })
})
