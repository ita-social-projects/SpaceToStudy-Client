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

export interface OfferResponce {
  _id: string
  price: string
  proficiencyLevel: string[]
  description: string
  languages: string[]
  authorRole: string
  authorFirstName: string
  authorLastName: string
  authorAvgRating: number
  authorId: string
  subjectId: string
  categoryId: string
  createdAt: string
  updatedAt: string
}
