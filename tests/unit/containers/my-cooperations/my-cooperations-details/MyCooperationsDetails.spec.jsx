import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import MyCooperationsDetails from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.tsx'

import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { mockedCoop } from '~tests/unit/containers/my-cooperations/MyCooperations.spec.constants'

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
      .reply(200, mockedCoop)

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
      `/user/${mockedCoop.initiator._id}?role=${mockedCoop.initiator.role[0]}`
    )
  })
})
