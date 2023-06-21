import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import MyOffersContainer from '~/containers/my-offers/my-offers-container/MyOffersContainer'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

const sortOptionsMock = {
  sort: { orderBy: 'name', order: 'asc' },
  onRequestSort: () => vi.fn()
}

describe('MyOffersContainer component ', () => {
  beforeEach(() => {
    renderWithProviders(
      <MyOffersContainer items={[mockOffer]} showTable sort={sortOptionsMock} />
    )
  })

  it('should render card in container', () => {
    const title = screen.getByText(mockOffer.title)

    expect(title).toBeInTheDocument()
  })
})
