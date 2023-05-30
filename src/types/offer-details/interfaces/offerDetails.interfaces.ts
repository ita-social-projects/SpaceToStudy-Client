import { LanguagesEnum, Offer, ProficiencyLevelEnum } from '~/types'

export interface EnrollOfferForm {
  proficiencyLevel: ProficiencyLevelEnum
  language: LanguagesEnum
  info: string
}

export interface CreateCooperationsParams
  extends EnrollOfferForm,
    Pick<Offer, 'price'> {
  offer: string
  receiver: string
}
