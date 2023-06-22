import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import {
  Offer,
  PriceRangeParams,
  PriceRangeResponse,
  GetOffersPrarams,
  CreateOrUpdateOfferData,
  GetMyOffersParams
} from '~/types'

export const OfferService = {
  getOffers: async (params?: GetOffersPrarams): Promise<AxiosResponse> => {
    const category = createUrlPath(URLs.categories.get, params?.categoryId)
    const subject = createUrlPath(URLs.subjects.get, params?.subjectId)
    return await axiosClient.get(`${category}${subject}${URLs.offers.get}`, {
      params
    })
  },
  createOffer: async (data: CreateOrUpdateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data),

  updateOffer: async (
    id: string,
    updateData: CreateOrUpdateOfferData
  ): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.offers.update, id), updateData),

  getOffer: async (id: string): Promise<AxiosResponse<Offer>> =>
    await axiosClient.get(createUrlPath(URLs.offers.get, id)),

  updateOffer: async (
    id: string,
    params?: GetOffersPrarams
  ): Promise<AxiosResponse<Offer>> =>
    await axiosClient.patch(createUrlPath(URLs.offers.get, id), params),

  getUsersOffers: async (params: GetMyOffersParams): Promise<AxiosResponse> => {
    const user = createUrlPath(URLs.users.get, params.id)
    return await axiosClient.get(`${user}${URLs.offers.get}`, { params })
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
