import {
  CommonEntityFields,
  ProficiencyLevelEnum,
  StatusEnum,
  EnrollOfferForm,
  Offer,
  UserResponse,
  UserRoleEnum,
  Quiz,
  Attachment,
  Lesson
} from '~/types'

export interface Cooperation extends CommonEntityFields {
  offer: Pick<Offer, 'subject' | 'title' | 'category' | 'price' | '_id'>
  user: Pick<UserResponse, 'firstName' | 'lastName' | 'photo' | '_id'> & {
    role: UserRoleEnum
  }
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum
  status: StatusEnum
  needAction: UserRoleEnum
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  offer: string
  receiver: string
  receiverRole: UserRoleEnum
}

export interface CooperationSection {
  _id?: string
  id: string
  title: string
  description: string
  lessons: Lesson[]
  quizzes: Quiz[]
  attachments: Attachment[]
}
