import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import MyCooperationsDetails from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.tsx'

import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

const mockedOffer = {
  initiator: { _id: 'initiatorId', role: ['tutor'] },
  receiver: { _id: 'receiverId', role: ['student'] },
  offer: {
    title: 'Title',
    description: 'Description',
    languages: ['Ukrainian', 'English'],
    author: {
      firstName: 'Michael',
      lastName: 'Scarn',
      photo: '1701182621626.jpg',
      professionalSummary: 'Agent'
    },
    subject: {
      name: 'Algebra'
    },
    category: {
      name: 'Mathematics',
      appearance: {
        color: '#1234'
      }
    },
    proficiencyLevel: ['INTERMEDIATE']
  },
  price: 100
}

const mockChatContext = {
  setChatInfo: vi.fn()
}

vi.mock('~/context/chat-context', () => ({
  useChatContext: () => mockChatContext
}))

describe('MyCooperationsDetails component', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.cooperations.getById.replace(':id', ''))
      .reply(200, mockedOffer)

    renderWithProviders(<MyCooperationsDetails />)
  })

  it('should render title', async () => {
    const title = await screen.findByText('cooperationDetailsPage.details')

    expect(title).toBeInTheDocument()
  })

  it('should render languages', async () => {
    const language1 = await screen.findByText('Ukrainian')
    const language2 = await screen.findByText('English')

    expect(language1, language2).toBeInTheDocument()
  })

  it('should open chat after clicking on chat-button', async () => {
    const sendMessageButton = await screen.findByRole('button', {
      name: 'common.labels.sendMessage'
    })

    expect(sendMessageButton).toBeInTheDocument()

    fireEvent.click(sendMessageButton)

    const chatWindow = await screen.findByTestId('MessageIcon')

    expect(chatWindow).toBeInTheDocument()
  })

  it('should render link to user profile with correct url', () => {
    const profileButton = screen.queryByText('cooperationDetailsPage.profile')

    expect(profileButton).toBeInTheDocument()
    expect(profileButton.parentElement.href).toContain(
      `/user/${mockedOffer.initiator._id}?role=${mockedOffer.initiator.role[0]}`
    )
  })
})
