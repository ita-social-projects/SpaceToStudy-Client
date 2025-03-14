import {
  type CommonEntityFields,
  type ProficiencyLevelEnum,
  type StatusEnum,
  type EnrollOfferForm,
  type Offer,
  type UserResponse,
  UserRoleEnum,
  type CourseSection
} from '~/types'

export enum NeedActionTypeEnum {
  WaitingForAnswer = 'waiting for answer',
  WaitingForApproval = 'waiting for approval',
  Price = 'price'
}

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
    role: UserRoleEnum.Tutor | UserRoleEnum.Student
  }
  initiator: UserResponse
  initiatorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  title: Offer['title']
  price: Offer['price']
  proficiencyLevel: ProficiencyLevelEnum
  chatId: string
  status: StatusEnum
  needAction: {
    role: UserRoleEnum.Tutor | UserRoleEnum.Student
    type: NeedActionTypeEnum
    messages: string[]
  }
  receiver: UserResponse
  receiverRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  sections: CourseSection[]
  completedResourcesPercentage: number
}

export interface CreateCooperationsParams extends EnrollOfferForm {
  offer: string
  receiver: string
  receiverRole: UserRoleEnum.Tutor | UserRoleEnum.Student
}
