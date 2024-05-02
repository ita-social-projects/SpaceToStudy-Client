import { ProficiencyLevelEnum } from '~/types/common/common.index'
import { UserResponse } from '~/types/user/user.index'

export interface EditProfileForm
  extends Pick<UserResponse, 'firstName' | 'lastName'> {
  country: string | null
  city: string | null
  professionalSummary: string
  nativeLanguage: string | null
  videoLink: string
}

export interface ProfessionalSubject {
  _id: string
  name: string
  proficiencyLevels: ProficiencyLevelEnum[]
}

export interface ProfessionalCategory {
  _id: string
  name: string
  subjects: ProfessionalSubject[]
}

export interface ProfessionalCategoryWithActivationControls
  extends ProfessionalCategory {
  isActivated: boolean
  isActivationBlocked: boolean
}
