import { beforeEach, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'

import FaqBlock from '~/containers/offer-page/faq-block/FaqBlock'
import { renderWithProviders } from '~tests/test-utils'

const handleNonInputValueChange = vi.fn()
const mockDate = 1487076708000
Date.now = vi.fn(() => mockDate)
const mockedFaqData = { question: '', answer: '', id: `${mockDate}` }

const data = {
  FAQ: [mockedFaqData]
}

const props = {
  data,
  handleNonInputValueChange
}

describe('FaqBlock component', () => {
  beforeEach(() => {
    renderWithProviders(<FaqBlock {...props} />)
  })
  it('should update FAQ item when input changes', () => {
    const questionInput = screen.getByLabelText('offerPage.labels.question')
    const answerInput = screen.getByLabelText('offerPage.labels.answer')

    fireEvent.change(questionInput, {
      target: { value: 'New question' }
    })

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      { ...mockedFaqData, question: 'New question', answer: '' }
    ])

    fireEvent.change(answerInput, {
      target: { value: 'New answer' }
    })

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      { ...mockedFaqData, question: '', answer: 'New answer' }
    ])
  })

  it('should add question or show error', () => {
    const addButton = screen.getByText('button.addQuestion')
    fireEvent.click(addButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      ...data.FAQ,
      mockedFaqData
    ])

    for (let i = 0; i < 4; i++) {
      data.FAQ.push(mockedFaqData)
    }
    fireEvent.click(addButton)

    const errorMessage = screen.getByText('offerPage.errorMessages.faq')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should remove question', () => {
    const closeButton = screen.getAllByTestId('CloseRoundedIcon')[0]
    fireEvent.click(closeButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith(
      'FAQ',
      data.FAQ.slice(1)
    )
  })
})
