import {
  CategoryInterface,
  SubjectInterface,
  ProficiencyLevelEnums,
  UserInterface
} from '~/types'

export interface OfferResponse extends UserInterface {
  _id: string
  category: CategoryInterface
  subject: SubjectInterface
  proficiencyLevel: ProficiencyLevelEnums
  description: string
  languages: []
  bio: string
  price: number
}
