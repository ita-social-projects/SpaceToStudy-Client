import { URLs } from '~/constants/request'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'
import { axiosClient } from '~/plugins/axiosClient'

export const OfferService = {
  createOffer: async (data:CreateOfferData) => await axiosClient.post(URLs.offers.create, data)
}
