import { Offer, ProficiencyLevelEnum } from '~/types'

export interface EnrollOfferForm extends Pick<Offer, 'price'> {
  proficiencyLevel: ProficiencyLevelEnum
  info: string
  title: string
}
