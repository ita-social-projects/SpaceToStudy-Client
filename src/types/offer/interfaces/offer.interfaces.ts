import { CategoryInterface, SubjectInterface } from '~/types'

export interface OfferResponse {
  category: CategoryInterface
  subject: SubjectInterface
  proficiencyLevel: string
  description: string
  languages: []
  bio: string
  price: number
}
