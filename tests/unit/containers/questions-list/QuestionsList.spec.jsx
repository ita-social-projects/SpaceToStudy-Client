import { expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import QuestionsList from '~/containers/questions-list/QuestionsList'
import { renderWithProviders } from '~tests/test-utils'

const mockedItems = [
  {
    title: 'React',
    text: 'Does React have Virtual DOM?',
    _id: 'some_id',
    answers: [
      {
        text: 'Yes',
        isCorrect: true
      },
      {
        text: 'No',
        isCorrect: false
      }
    ],
    author: 'some-author-id',
    category: {
      _id: 'some-category-id',
      name: 'Philosophy'
    }
  }
]

const mockedSetItems = vi.fn()

describe('QuestionsList test', () => {
  beforeEach(() => {
    renderWithProviders(
      <QuestionsList items={mockedItems} setItems={mockedSetItems} />
    )
  })

  it('should render question', async () => {
    const text = await screen.findByText(mockedItems[0].text)

    expect(text).toBeInTheDocument()
  })

  it('should render question category', async () => {
    const name = await screen.findByText(mockedItems[0].category.name)

    expect(name).toBeInTheDocument()
  })
})
