import { screen } from '@testing-library/react'
import MessagesList from '~/pages/chat/MessagesList'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('~/components/message/Message', () => ({
  default: vi.fn(() => <div data-testid='mock-message'>Mock Message</div>)
}))

global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  trigger: (entries) => callback(entries)
}))

const mockMessages = [
  {
    _id: '66c4503c91f22567cb488835',
    author: {
      _id: '669f8b72ea14fb4d8b194721',
      photo: '1721732156629-profile.jpg'
    },
    authorRole: 'student',
    text: '12',
    isRead: false,
    chat: '66b2122e562efa2f223acc1e',
    clearedFor: [],
    createdAt: '2024-08-20T08:13:48.251Z',
    updatedAt: '2024-08-20T08:13:48.251Z'
  },
  {
    _id: '66c4504591f22567cb488871',
    author: {
      _id: '669f8b72ea14fb4d8b194721',
      photo: '1721732156629-profile.jpg'
    },
    authorRole: 'student',
    text: '13',
    isRead: false,
    chat: '66b2122e562efa2f223acc1e',
    clearedFor: [],
    createdAt: '2024-08-20T08:13:57.930Z',
    updatedAt: '2024-08-20T08:15:10.159Z'
  },
  {
    _id: '66c4508e91f22567cb4888cf',
    author: {
      _id: '669f8b72ea14fb4d8b194721',
      photo: '1721732156629-profile.jpg'
    },
    authorRole: 'student',
    text: '14',
    isRead: false,
    chat: '66b2122e562efa2f223acc1e',
    clearedFor: [],
    createdAt: '2024-08-20T08:15:10.159Z',
    updatedAt: '2024-08-20T08:15:10.159Z'
  }
]

describe('MessagesList component', () => {
  it('renders loading message when messages are empty', () => {
    renderWithProviders(
      <MessagesList infiniteLoadCallback={vi.fn()} messages={[]} />
    )
    expect(screen.getByText('chatPage.message.noMessages')).toBeInTheDocument()
  })

  it('renders loading message while messages are loading', () => {
    renderWithProviders(
      <MessagesList
        infiniteLoadCallback={vi.fn()}
        isMessagesLoading
        messages={[]}
      />
    )
    expect(screen.getByText('chatPage.chat.loading')).toBeInTheDocument()
  })

  it('renders messages grouped by date with ChatDate and Message components', () => {
    renderWithProviders(
      <MessagesList infiniteLoadCallback={vi.fn()} messages={mockMessages} />
    )
    expect(screen.getByText(/August/i)).toBeInTheDocument()
  })
})
