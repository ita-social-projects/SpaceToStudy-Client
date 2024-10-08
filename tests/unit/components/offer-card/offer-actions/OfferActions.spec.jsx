import { vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'

const price = '100'
const isBookmarked = false
const onBookmarkClick = vi.fn()
const buttonActions = [
  { label: 'Action 1', buttonProps: { onClick: vi.fn() } },
  { label: 'Action 2', buttonProps: { onClick: vi.fn() } }
]

describe('OfferActions', () => {
  beforeEach(() => {
    render(
      <OfferActions
        buttonActions={buttonActions}
        isBookmarked={isBookmarked}
        onBookmarkClick={onBookmarkClick}
        price={price}
      />
    )
  })

  it('renders the bookmark button correctly', () => {
    expect(screen.getByTestId('iconButton')).toBeInTheDocument()
  })

  it('calls onBookmarkClick when the bookmark button is clicked', () => {
    const bookmarkButton = screen.getByTestId('iconButton')
    fireEvent.click(bookmarkButton)
    expect(onBookmarkClick).toHaveBeenCalled()
  })

  it('renders the button actions correctly', () => {
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('calls the handleClick function when a button is clicked', () => {
    const actionButton = screen.getByText('Action 1')
    fireEvent.click(actionButton)
    expect(buttonActions[0].buttonProps.onClick).toHaveBeenCalled()
  })
})
