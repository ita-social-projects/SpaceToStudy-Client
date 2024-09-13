import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import MyOffers from '~/pages/my-offers/MyOffers'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { UserRoleEnum } from '~/types'

const mockData = {
  offers: [mockOffer],
  count: 0
}

mockAxiosClient
  .onGet(`${URLs.users.get}/_id/${URLs.offers.get}`)
  .reply(200, mockData)

describe('MyOffers', () => {
  beforeEach(async () => {
    await waitFor(() =>
      renderWithProviders(<MyOffers />, {
        preloadedState: {
          appMain: {
            userRole: UserRoleEnum.Tutor
          }
        }
      })
    )
  })
  it('should render title on page', () => {
    const title = screen.getByText('myOffersPage.title.tutor')

    expect(title).toBeInTheDocument()
  })
})
