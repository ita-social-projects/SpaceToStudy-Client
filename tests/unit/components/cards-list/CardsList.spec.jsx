import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import CardsList from '~/components/cards-list/CardsList'

const mockOnClick = vi.fn()
const mockCards = [<div key='1'>Music</div>, <div key='2'>IT</div>]
const btnText = 'View more'

describe('CardsList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the loader when loading and no cards are present', () => {
    renderWithProviders(
      <CardsList btnText={btnText} cards={[]} loading onClick={mockOnClick} />
    )

    const loaders = screen.getAllByTestId('loader')

    expect(loaders[0]).toBeInTheDocument()
  })

  it('should render the cards when not loading', () => {
    renderWithProviders(
      <CardsList
        btnText={btnText}
        cards={mockCards}
        loading={false}
        onClick={mockOnClick}
      />
    )

    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('IT')).toBeInTheDocument()
  })

  it('should render the button when isExpandable is true', () => {
    renderWithProviders(
      <CardsList
        btnText={btnText}
        cards={mockCards}
        loading={false}
        onClick={mockOnClick}
      />
    )

    const button = screen.getByText(btnText)
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should not render the button when isExpandable is false', () => {
    renderWithProviders(
      <CardsList
        btnText={btnText}
        cards={mockCards}
        isExpandable={false}
        loading={false}
        onClick={mockOnClick}
      />
    )

    expect(screen.queryByText(btnText)).not.toBeInTheDocument()
  })
})
