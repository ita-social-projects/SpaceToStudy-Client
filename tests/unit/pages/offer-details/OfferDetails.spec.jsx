import { vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import { mockOffer } from '~/pages/find-offers/FindOffers.constants'

const mockAxiosClient = new MockAdapter(axiosClient)

vi.mock('~/services/offer-service')

const mockParams = {
  id: '123'
}

const mockData = {
  id: '64480bb14ee3d89a58631730',
  price: 95,
  proficiencyLevel: ['Beginner'],
  description: 'description',
  languages: ['English'],
  authorRole: 'student',
  authorFirstName: 'Tart',
  authorLastName: 'Drilling',
  authorAvgRating: 0,
  subject: 'Music',
  status: 'pending'
}

describe('OfferDetails', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockParams.id}`)
      .reply(200, mockData)

    render(
      <MemoryRouter initialEntries={[`/offers/${mockOffer.id}`]}>
        <OfferDetails />
      </MemoryRouter>
    )
  })

  it('should display the offer details correctly', () => {
    expect(screen.getByText('For Example')).toBeInTheDocument()
  })
})
