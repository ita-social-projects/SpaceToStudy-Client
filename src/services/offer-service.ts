import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'
import { axiosClient } from '~/plugins/axiosClient'
import {
  Offer,
  PriceRangeParams,
  PriceRangeResponse,
  GetOffersPrarams
} from '~/types'

export const OfferService = {
  getOffers: async (params?: GetOffersPrarams): Promise<AxiosResponse> => {
    const category = params?.categoryId ? `/${params.categoryId}` : ''
    const subject = params?.subjectId ? `/${params.subjectId}` : ''
    return await axiosClient.get(
      `${URLs.categories.get}${category}${URLs.subjects.get}${subject}${URLs.offers.get}`,
      { params }
    )
  },
  createOffer: async (data: CreateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data),

  getOffer: async (id: string): Promise<AxiosResponse<Offer>> =>
    await axiosClient.get(`${URLs.offers.get}/${id}`),

  getPriceRange: async (
    data: PriceRangeParams
  ): Promise<AxiosResponse<PriceRangeResponse>> => {
    const category = data.categoryId ? `/${data.categoryId}` : ''
    const subject = data.subjectId ? `/${data.subjectId}` : ''

    return await axiosClient.get(
      `${URLs.categories.get}${category}${URLs.subjects.get}${subject}${URLs.categories.priceRange}`,
      { params: { authorRole: data.authorRole } }
    )
  }
}
