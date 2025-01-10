import {
  CommonEntityFields,
  ProficiencyLevelEnum,
  StatusEnum,
  EnrollOfferForm,
  Offer,
  UserResponse,
  UserRoleEnum,
  CourseSection
} from '~/types'

export interface Cooperation extends CommonEntityFields {
  offer: Pick<
    Offer,
    | 'subject'
    | 'title'
    | 'category'
    | 'price'
    | '_id'
    | 'chatId'
    | 'languages'
    | 'author'
    | 'proficiencyLevel'
    | 'description'
  >
  user: Pick<UserResponse, 'firstName' | 'lastName' | 'photo' | '_id'> & {
    role: UserRoleEnum
  }
  initiator: UserResponse
  initiatorRole: 'tutor' | 'student'
  title: Offer['title']
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum
  chatId: string
  status: StatusEnum
  needAction: UserRoleEnum
  receiver: UserResponse
  receiverRole: 'tutor' | 'student'
  sections: CourseSection[]
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  offer: string
  receiver: string
  receiverRole: UserRoleEnum
}
