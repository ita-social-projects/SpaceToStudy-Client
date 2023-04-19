import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'
import { axiosClient } from '~/plugins/axiosClient'

export const OfferService = {
  createOffer: async (data: CreateOfferData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.offers.create, data)
}
