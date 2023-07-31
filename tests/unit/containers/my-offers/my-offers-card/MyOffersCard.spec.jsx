import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import MyOffersCard from '~/containers/my-offers/my-offers-card/MyOffersCard'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

const buttonActions = [{ label: 'Action 1', buttonProps: { onClick: vi.fn() } }]

describe('MyOffersCard test', () => {
  beforeEach(() => {
    renderWithProviders(
      <MyOffersCard buttonActions={buttonActions} offer={mockOffer} />
    )
  })
  it('should render card correctly', () => {
    const title = screen.getByText(mockOffer.title)

    expect(title).toBeInTheDocument()
  })

  it('should call the correct click function when button was clicked', () => {
    const button = screen.getByText('Action 1')

    fireEvent.click(button)

    expect(buttonActions[0].buttonProps.onClick).toHaveBeenCalled()
  })
})
