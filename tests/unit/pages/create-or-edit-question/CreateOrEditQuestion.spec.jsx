import { screen } from '@testing-library/react'
import { useParams } from 'react-router-dom'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import CreateOrEditQuestion from '~/pages/create-or-edit-question/CreateOrEditQuestion'
import { vi } from 'vitest'

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useParams: vi.fn()
  }
})

const mockQuestion = {
  _id: '123',
  title: 'Sample Question',
  text: 'What is the capital of France?',
  answers: [{ text: 'Paris', isCorrect: true }],
  type: 'oneAnswer',
  category: null
}

describe('CreateOrEditQuestion component test', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: mockQuestion._id })

    mockAxiosClient
      .onGet(URLs.resources.questions.getById.replace(':id', mockQuestion._id))
      .reply(200, mockQuestion)

    renderWithProviders(<CreateOrEditQuestion />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display CreateQuestion form', async () => {
    const title = await screen.findByLabelText('questionPage.untitled')

    expect(title).toBeInTheDocument()
  })
})
