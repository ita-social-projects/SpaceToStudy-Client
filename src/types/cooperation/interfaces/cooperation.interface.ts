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
  CourseSection,
  LanguagesEnum,
  NeedActionTypeEnum
} from '~/types'

export interface Cooperation extends CommonEntityFields {
  offer: string
  subject: Pick<SubjectInterface, 'name'>
  category: CategoryInterface
  description: string
  languages: LanguagesEnum[]
  user: Pick<
    UserResponse,
    'firstName' | 'lastName' | 'photo' | '_id' | 'professionalSummary'
  > & {
    role: UserRoleEnum[]
  }
  receiver: UserResponse
  receiverRole: UserRoleEnum
  initiator: UserResponse
  initiatorRole: UserRoleEnum
  title: Offer['title']
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum[]
  status: StatusEnum
  completedResourcesPercentage: number
  chatId: string
  needAction: {
    role: UserRoleEnum.Tutor | UserRoleEnum.Student
    type: NeedActionTypeEnum
    messages: string[]
  }
  sections: CourseSection[]
  createdAt: string
  updatedAt: string
}

export interface MyCooperationDetails<TOffer extends Offer> {
  offer: Pick<TOffer, '_id' | 'author' | 'chatId'>
  price: number
  title: string
  description: string
  receiver: UserResponse
  receiverRole: UserRoleEnum
  languages: LanguagesEnum[]
  chatId: string
  author: UserResponse
  subject: Pick<SubjectInterface, 'name'>
  category: CategoryInterface
  proficiencyLevel: ProficiencyLevelEnum[]
  initiator: UserResponse
  initiatorRole: UserRoleEnum
  status: StatusEnum
  needAction: {
    role: UserRoleEnum.Tutor | UserRoleEnum.Student
    type: NeedActionTypeEnum
    messages: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  title: string
  offer: string
  receiver: string
  receiverRole: UserRoleEnum
  subject: string
  category: string
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
  languages: LanguagesEnum[]
}
