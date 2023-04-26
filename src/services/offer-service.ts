import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'
import { axiosClient } from '~/plugins/axiosClient'
import { OfferResponse } from '~/types'

export const OfferService = {
  createOffer: async (data: CreateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data),

  getOffer: async (id: string): Promise<AxiosResponse<OfferResponse>> =>
    await axiosClient.get(`${URLs.offers.get}/${id}`)
}
