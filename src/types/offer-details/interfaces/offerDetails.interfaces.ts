import { LanguagesEnum, Offer, ProficiencyLevelEnum } from '~/types'

export interface EnrollOfferForm {
  proficiencyLevel: ProficiencyLevelEnum
  language: LanguagesEnum
  info: string
}

export interface CreateCooperationsParams
  extends EnrollOfferForm,
    Pick<Offer, 'price'> {
  offerId: string
  recipientUserId: string
}
