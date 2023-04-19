import { CategoryInterface, SubjectInterface, ProficiencyLevelEnums } from '~/types'

export interface OfferResponse {
  category: CategoryInterface
  subject: SubjectInterface
  proficiencyLevel: ProficiencyLevelEnums
  description: string
  languages: []
  bio: string
  price: number
}
