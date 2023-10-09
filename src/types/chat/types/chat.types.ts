import { Offer } from '~/types/offer/offer.index'

export type ChatInfo = Pick<Offer, 'author' | 'authorRole' | 'chatId'> & {
  updateInfo: () => void
}
