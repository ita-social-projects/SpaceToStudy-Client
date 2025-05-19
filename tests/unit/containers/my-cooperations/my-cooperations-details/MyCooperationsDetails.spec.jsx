import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { getCooperationByIdMockResponse } from '~tests/test-constants'
import { URLs } from '~/constants/request'
import MyCooperationsDetails from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.tsx'

import { screen, fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'

const mockedCooperation = { ...getCooperationByIdMockResponse }
mockedCooperation.languages = ['Ukrainian', 'English']

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
      .reply(200, mockedCooperation)

    renderWithProviders(<MyCooperationsDetails />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render title', async () => {
    const title = await screen.findAllByText('cooperationDetailsPage.details')

    expect(title).toHaveLength(2)
    expect(...title).toBeInTheDocument()
  })

  it('should render languages', async () => {
    const language1 = await screen.findByText('Ukrainian')
    expect(language1).toBeInTheDocument()

    const language2 = await screen.findByText('English')
    expect(language2).toBeInTheDocument()
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

    console.log()

    expect(profileButton).toBeInTheDocument()
    expect(profileButton.parentElement.href).toContain(
      `/user/${mockedCooperation.initiator._id}?role=${mockedCooperation.initiator.role[0]}`
    )
  })
})
