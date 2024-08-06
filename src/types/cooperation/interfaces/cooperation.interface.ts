import {
  CommonEntityFields,
  ProficiencyLevelEnum,
  StatusEnum,
  EnrollOfferForm,
  Offer,
  UserResponse,
  UserRoleEnum,
  SubjectInterface,
  CategoryInterface,
  CourseSection
} from '~/types'

export interface Cooperation extends CommonEntityFields {
  offer: Pick<Offer, 'subject' | 'title' | 'category' | 'price' | '_id'>
  user: Pick<UserResponse, 'firstName' | 'lastName' | 'photo' | '_id'> & {
    role: UserRoleEnum
  }
  title: Offer['title']
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum
  status: StatusEnum
  needAction: UserRoleEnum
  sections: CourseSection[]
}

export interface MyCooperationDetails<TOffer extends Offer> {
  offer: Pick<
    TOffer,
    | 'subject'
    | 'title'
    | 'category'
    | 'price'
    | '_id'
    | 'author'
    | 'proficiencyLevel'
    | 'description'
    | 'languages'
    | 'chatId'
  >
  price: number
  title: string
  description: string
  receiver: UserResponse
  receiverRole: UserRoleEnum
  languages: string[]
  chatId: string
  author: UserResponse
  subject: Pick<SubjectInterface, 'name'>
  category: CategoryInterface
  proficiencyLevel: ProficiencyLevelEnum
  initiator: UserResponse
  initiatorRole: UserRoleEnum
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  offer: string
  receiver: string
  receiverRole: UserRoleEnum
}
