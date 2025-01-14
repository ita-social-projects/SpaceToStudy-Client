import { afterEach, beforeEach, vi } from 'vitest'
import { mockAxiosClient } from '~tests/test-utils'
import { OfferService } from '~/services/offer-service'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { offersMock } from '~tests/unit/pages/find-offers/FindOffers.constants'
import { URLs } from '~/constants/request'

const categoryId = mockOffer.category._id
const subjectId = mockOffer.subject._id

describe('offerService getOffers function tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should find offer by categoryId and subjectId', async () => {
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.offers.getByCategoryAndSubjectId
            .replace(':categoryId', categoryId)
            .replace(':subjectId', subjectId)
        )
      )
      .reply(200, mockOffer)
    const result = await OfferService.getOffers({
      categoryId,
      subjectId
    })
    expect(result).toEqual(mockOffer)
  })

  it('should find offer by categoryId', async () => {
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.offers.getByCategoryId.replace(':categoryId', categoryId)
        )
      )
      .reply(200, mockOffer)
    const result = await OfferService.getOffers({
      categoryId
    })
    expect(result).toEqual(mockOffer)
  })

  it('should find offer by subjectId', async () => {
    mockAxiosClient
      .onGet(
        new RegExp(URLs.offers.getBySubjectId.replace(':subjectId', subjectId))
      )
      .reply(200, mockOffer)
    const result = await OfferService.getOffers({
      subjectId
    })
    expect(result).toEqual(mockOffer)
  })

  it('should find all offers', async () => {
    mockAxiosClient.onGet(new RegExp(URLs.offers.get)).reply(200, offersMock)
    const result = await OfferService.getOffers({})
    expect(result).toEqual(offersMock)
  })
})
