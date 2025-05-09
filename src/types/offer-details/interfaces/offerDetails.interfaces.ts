import { Offer, ProficiencyLevelEnum } from '~/types'

export interface EnrollOfferForm extends Pick<Offer, 'price'> {
  proficiencyLevel: ProficiencyLevelEnum[]
  title: string
  additionalInfo?: string
}
