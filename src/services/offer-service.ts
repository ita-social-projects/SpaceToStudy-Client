import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import {
  Offer,
  PriceRangeParams,
  PriceRangeResponse,
  GetOffersPrarams,
  CreateOfferData,
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
  createOffer: async (data: CreateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data),

  getOffer: async (id: string): Promise<AxiosResponse<Offer>> =>
    await axiosClient.get(createUrlPath(URLs.offers.get, id)),

  getUsersOffers: async (params: GetMyOffersParams): Promise<AxiosResponse> => {
    const userId = params.id
    return await axiosClient.get(
      `${URLs.users.get}/${userId}${URLs.offers.get}`,
      { params }
    )
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
