import {
  CategoryInterface,
  SubjectNameInterface,
  UpdatedPhoto
} from '~/types/common/common.index'
import { UserResponse } from '~/types/user/user.index'

export interface EditProfileForm
  extends Pick<UserResponse, 'firstName' | 'lastName'> {
  country: string | null
  city: string | null
  professionalSummary: string
  nativeLanguage: string | null
  videoLink: string
  photo: string | UpdatedPhoto | null
}

export interface ProfessionalCategory {
  category: Pick<CategoryInterface, '_id' | 'name' | 'appearance'>
  subjects: SubjectNameInterface[]
}

export interface UserMainSubject extends ProfessionalCategory {
  isDeletionBlocked: boolean
  _id: string
}

export interface EditProfileUserProps {
  user: UserResponse
}

export interface NotificationSettings {
  isOfferStatusNotification: boolean
  isChatNotification: boolean
  isSimilarOffersNotification: boolean
  isEmailNotification: boolean
}
