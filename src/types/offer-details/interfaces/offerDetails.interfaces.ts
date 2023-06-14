import { Offer, ProficiencyLevelEnum, UserRoleEnum } from '~/types'

export interface EnrollOfferForm extends Pick<Offer, 'price'> {
  proficiencyLevel: ProficiencyLevelEnum
  info: string
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  offer: string
  receiver: string
  receiverRole: UserRoleEnum
}
