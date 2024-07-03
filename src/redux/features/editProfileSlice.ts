import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sliceNames } from '~/redux/redux.constants'
import {
  SubjectNameInterface,
  UpdatedPhoto,
  UserMainSubject,
  UserMainSubjectFieldValues
} from '~/types'

interface EditProfileState {
  firstName: string
  lastName: string
  country: string
  city: string
  professionalSummary: string
  nativeLanguage: string
  videoLink: string
  photo: string | UpdatedPhoto | null
  categories: UserMainSubject[]
  education: string
  workExperience: string
  scientificActivities: string
  awards: string
  isOfferStatusNotification: boolean
  isChatNotification: boolean
  isSimilarOffersNotification: boolean
  isEmailNotification: boolean
}

const initialState: EditProfileState = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: '',
  nativeLanguage: '',
  videoLink: '',
  photo: null,
  categories: [],
  education: '',
  workExperience: '',
  scientificActivities: '',
  awards: '',
  isOfferStatusNotification: false,
  isChatNotification: false,
  isSimilarOffersNotification: false,
  isEmailNotification: false
}

const editProfileSlice = createSlice({
  name: sliceNames.editProfile,
  initialState,
  reducers: {
    setFirstName: (
      state,
      action: PayloadAction<EditProfileState['firstName']>
    ) => {
      state.firstName = action.payload
    },
    setLastName: (
      state,
      action: PayloadAction<EditProfileState['lastName']>
    ) => {
      state.lastName = action.payload
    },
    setCountry: (state, action: PayloadAction<EditProfileState['country']>) => {
      state.country = action.payload
    },
    setCity: (state, action: PayloadAction<EditProfileState['city']>) => {
      state.city = action.payload
    },
    setProfessionalSummary: (
      state,
      action: PayloadAction<EditProfileState['professionalSummary']>
    ) => {
      state.professionalSummary = action.payload
    },
    setNativeLanguage: (
      state,
      action: PayloadAction<EditProfileState['nativeLanguage']>
    ) => {
      state.nativeLanguage = action.payload
    },
    setVideoLink: (
      state,
      action: PayloadAction<EditProfileState['videoLink']>
    ) => {
      state.videoLink = action.payload
    },
    setPhoto: (state, action: PayloadAction<EditProfileState['photo']>) => {
      state.photo = action.payload
    },
    setCategories: (
      state,
      action: PayloadAction<EditProfileState['categories']>
    ) => {
      state.categories = action.payload
    },
    addCategory: (state, action: PayloadAction<UserMainSubject>) => {
      const existingCategory = state.categories.find(
        (category) => category._id === action.payload._id
      ) as UserMainSubject

      if (!existingCategory) {
        state.categories.push(action.payload)
      }
    },
    editCategory: (
      state,
      action: PayloadAction<{
        id: string
        field: keyof UserMainSubject
        value: UserMainSubjectFieldValues
      }>
    ) => {
      const categoryToEdit = state.categories.find(
        (category) => category._id === action.payload.id
      ) as UserMainSubject

      if (categoryToEdit) {
        categoryToEdit[action.payload.field] = action.payload.value
      }
    },
    addSubjectToCategory: (
      state,
      action: PayloadAction<{
        id: string
        subject: SubjectNameInterface
      }>
    ) => {
      const existingCategory = state.categories.find(
        (category) => category._id === action.payload.id
      ) as UserMainSubject

      if (existingCategory) {
        const existingSubject = existingCategory.subjects.find(
          (subject) => subject._id === action.payload.subject._id
        ) as SubjectNameInterface

        if (!existingSubject) {
          existingCategory.subjects.push(action.payload.subject)
        }
      }
    },
    removeSubjectFromCategory: (
      state,
      action: PayloadAction<{
        id: string
        subjectId: string
      }>
    ) => {
      const existingCategory = state.categories.find(
        (category) => category._id === action.payload.id
      ) as UserMainSubject

      if (existingCategory) {
        existingCategory.subjects = existingCategory.subjects.filter(
          (subject) => subject._id !== action.payload.subjectId
        )
      }
    },
    deleteCategory: (state, action: PayloadAction<{ id: string }>) => {
      const categoryToDelete = state.categories.find(
        (category) => category._id === action.payload.id
      ) as UserMainSubject

      if (categoryToDelete) {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.id
        )
      }
    },
    setEducation: (
      state,
      action: PayloadAction<EditProfileState['education']>
    ) => {
      state.education = action.payload
    },
    setWorkExperience: (
      state,
      action: PayloadAction<EditProfileState['workExperience']>
    ) => {
      state.workExperience = action.payload
    },
    setScientificActivities: (
      state,
      action: PayloadAction<EditProfileState['scientificActivities']>
    ) => {
      state.scientificActivities = action.payload
    },
    setAwards: (state, action: PayloadAction<EditProfileState['awards']>) => {
      state.awards = action.payload
    },
    setIsOfferStatusNotification: (
      state,
      action: PayloadAction<EditProfileState['isOfferStatusNotification']>
    ) => {
      state.isOfferStatusNotification = action.payload
    },
    setIsChatNotification: (
      state,
      action: PayloadAction<EditProfileState['isChatNotification']>
    ) => {
      state.isChatNotification = action.payload
    },
    setIsSimilarOffersNotification: (
      state,
      action: PayloadAction<EditProfileState['isSimilarOffersNotification']>
    ) => {
      state.isSimilarOffersNotification = action.payload
    },
    setIsEmailNotification: (
      state,
      action: PayloadAction<EditProfileState['isEmailNotification']>
    ) => {
      state.isEmailNotification = action.payload
    }
  }
})

const { actions, reducer } = editProfileSlice

export const {
  setFirstName,
  setLastName,
  setCountry,
  setCity,
  setProfessionalSummary,
  setNativeLanguage,
  setVideoLink,
  setPhoto,
  setCategories,
  addCategory,
  editCategory,
  addSubjectToCategory,
  removeSubjectFromCategory,
  deleteCategory,
  setEducation,
  setWorkExperience,
  setScientificActivities,
  setAwards,
  setIsOfferStatusNotification,
  setIsChatNotification,
  setIsSimilarOffersNotification,
  setIsEmailNotification
} = actions

export default reducer
