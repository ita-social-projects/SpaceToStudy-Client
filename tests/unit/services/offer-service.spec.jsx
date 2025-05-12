import { afterEach, vi } from 'vitest'
import { mockAxiosClient } from '~tests/test-utils'
import { OfferService } from '~/services/offer-service'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { offersMock } from '~tests/unit/pages/find-offers/FindOffers.constants'
import { URLs } from '~/constants/request'
import * as getFullUrl from '~/utils/get-full-url'

const categoryId = mockOffer.category._id
const subjectId = mockOffer.subject._id
const searchParams = {
  sort: 'createdAt',
  language: '',
  native: 'false',
  rating: '0',
  authorRole: 'student',
  search: '',
  proficiencyLevel: [],
  price: null,
  page: '1'
}

describe('offerService getOffers function tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should find offer by categoryId and subjectId', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

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
      subjectId,
      ...searchParams
    })

    expect(result).toEqual(mockOffer)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.offers.getByCategoryAndSubjectId,
      parameters: { categoryId, subjectId },
      searchParameters: searchParams
    })
  })

  it('should find offer by categoryId', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.offers.getByCategoryId.replace(':categoryId', categoryId)
        )
      )
      .reply(200, mockOffer)

    const result = await OfferService.getOffers({
      categoryId,
      ...searchParams
    })

    expect(result).toEqual(mockOffer)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.offers.getByCategoryId,
      parameters: { categoryId },
      searchParameters: searchParams
    })
  })

  it('should find offer by subjectId', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onGet(
        new RegExp(URLs.offers.getBySubjectId.replace(':subjectId', subjectId))
      )
      .reply(200, mockOffer)

    const result = await OfferService.getOffers({
      subjectId,
      ...searchParams
    })

    expect(result).toEqual(mockOffer)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.offers.getBySubjectId,
      parameters: { subjectId },
      searchParameters: searchParams
    })
  })

  it('should find all offers', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')
    mockAxiosClient.onGet(new RegExp(URLs.offers.get)).reply(200, offersMock)

    const result = await OfferService.getOffers(searchParams)
    expect(result).toEqual(offersMock)

    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.offers.get,
      searchParameters: searchParams
    })
  })

  it('should update offer by id with given data', async () => {
    const offerId = '12345'
    const updateData = {
      id: offerId,
      title: 'Updated Offer Title',
      price: 99
    }

    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onPatch(new RegExp(`${URLs.offers.updateById.replace(':id', offerId)}`))
      .reply(200)

    const result = await OfferService.updateOffer(updateData)

    expect(result).toBeUndefined()
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.offers.updateById,
      parameters: { id: offerId }
    })
  })
})
