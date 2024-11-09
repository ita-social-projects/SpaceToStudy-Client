import { Offer, ProficiencyLevelEnum } from '~/types'

export interface EnrollOfferForm extends Pick<Offer, 'price'> {
<<<<<<< HEAD
  proficiencyLevel: ProficiencyLevelEnum
  additionalInfo?: string
=======
  proficiencyLevel: ProficiencyLevelEnum[]
  info: string
>>>>>>> 33658654 (changed cooperation data according to changes on the backend)
  title: string
}
