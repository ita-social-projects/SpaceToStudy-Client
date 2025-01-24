import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import {
  Offer,
  PriceRangeParams,
  PriceRangeResponse,
  GetOffersParams,
  CreateOrUpdateOfferData,
  GetMyOffersParams,
  ItemsWithCount
} from '~/types'
import { baseService } from './base-service'

export const OfferService = {
  getOffers: async (params: GetOffersParams) => {
    const { categoryId, subjectId, ...restParams } = params

    let url = getFullUrl({
      pathname: URLs.offers.get,
      searchParameters: restParams
    })

    if (categoryId && subjectId) {
      url = getFullUrl({
        pathname: URLs.offers.getByCategoryAndSubjectId,
        parameters: { categoryId, subjectId },
        searchParameters: restParams
      })
    } else if (categoryId) {
      url = getFullUrl({
        pathname: URLs.offers.getByCategoryId,
        parameters: { categoryId },
        searchParameters: restParams
      })
    } else if (subjectId) {
      url = getFullUrl({
        pathname: URLs.offers.getBySubjectId,
        parameters: { subjectId },
        searchParameters: restParams
      })
    }

    return baseService.request<ItemsWithCount<Offer>>({
      method: 'GET',
      url
    })
  },

  createOffer: async (data: CreateOrUpdateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data),

  updateOffer: async (
    id: string,
    updateData?: Partial<CreateOrUpdateOfferData>
  ): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.offers.update, id), updateData),

  getOffer: async (id: string): Promise<AxiosResponse<Offer>> =>
    await axiosClient.get(createUrlPath(URLs.offers.get, id)),

  getUsersOffers: (params: GetMyOffersParams) => {
    const resultUrl = getFullUrl({
      pathname: URLs.users.offers,
      parameters: { id: params.id },
      searchParameters: params
    })
    return baseService.request<ItemsWithCount<Offer>>({
      method: 'GET',
      url: resultUrl
    })
  },

  getPriceRange: async (
    data: PriceRangeParams
  ): Promise<AxiosResponse<PriceRangeResponse>> => {
    const category = createUrlPath(URLs.categories.get, data.categoryId)
    const subject = createUrlPath(URLs.subjects.get, data.subjectId)

    return await axiosClient.get(
      `${category}${subject}${URLs.categories.priceRange}`,
      { params: { authorRole: data.authorRole } }
    )
  }
}
