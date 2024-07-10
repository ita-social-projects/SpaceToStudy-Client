import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  LoadingStatus,
  LoadingStatusEnum,
  sliceNames
} from '~/redux/redux.constants'
import {
  DataByRole,
  ErrorResponse,
  MainUserRole,
  SubjectNameInterface,
  UpdateUserParams,
  UserMainSubject,
  UserMainSubjectFieldValues,
  UserResponse,
  UserRole,
  UserRoleEnum
} from '~/types'
import { userService } from '~/services/user-service'

interface EditProfileState {
  firstName: string
  lastName: string
  country: string
  city: string
  professionalSummary?: string
  nativeLanguage: string | null
  videoLink: DataByRole<string>
  photo?: string | null
  categories: DataByRole<UserMainSubject[]>
  education?: string
  workExperience?: string
  scientificActivities?: string
  awards?: string
  isOfferStatusNotification: boolean
  isChatNotification: boolean
  isSimilarOffersNotification: boolean
  isEmailNotification: boolean
  loading: LoadingStatus
  error: string | null
}

const initialState: EditProfileState = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: '',
  nativeLanguage: '',
  videoLink: { [UserRoleEnum.Tutor]: '', [UserRoleEnum.Student]: '' },
  photo: null,
  categories: { [UserRoleEnum.Tutor]: [], [UserRoleEnum.Student]: [] },
  education: '',
  workExperience: '',
  scientificActivities: '',
  awards: '',
  isOfferStatusNotification: false,
  isChatNotification: false,
  isSimilarOffersNotification: false,
  isEmailNotification: false,
  loading: LoadingStatusEnum.Idle,
  error: null
}

const updateStateFromPayload = (
  state: EditProfileState,
  payload: UserResponse
) => {
  const {
    firstName,
    lastName,
    address,
    professionalSummary,
    nativeLanguage,
    photo,
    videoLink,
    mainSubjects,
    professionalBlock
  } = payload
  state.firstName = firstName
  state.lastName = lastName
  state.country = address.country
  state.city = address.city
  state.professionalSummary = professionalSummary
  state.nativeLanguage = nativeLanguage
  state.photo = photo
  state.videoLink = videoLink
  state.categories = mainSubjects
  state.education = professionalBlock?.education
  state.workExperience = professionalBlock?.workExperience
  state.scientificActivities = professionalBlock?.scientificActivities
  state.awards = professionalBlock?.awards
}

export const fetchUserById = createAsyncThunk(
  'editProfile/fetchUserById',
  async (
    {
      userId,
      role,
      isEdit
    }: { userId: string; role: UserRole; isEdit: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.getUserById(userId, role, isEdit)
      return response.data
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

export const updateUser = createAsyncThunk(
  'editProfile/updateUser',
  async (
    { userId, params }: { userId: string; params: UpdateUserParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUser(userId, params)
      return response.data
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data.code)
    }
  }
)

const editProfileSlice = createSlice({
  name: sliceNames.editProfile,
  initialState,
  reducers: {
    setField: <K extends keyof EditProfileState>(
      state: EditProfileState,
      action: PayloadAction<{ field: K; value: EditProfileState[K] }>
    ) => {
      const { field, value } = action.payload
      state[field] = value
    },
    addCategory: (
      state,
      action: PayloadAction<{
        category: UserMainSubject
        userRole: MainUserRole
      }>
    ) => {
      const { category, userRole } = action.payload
      const existingCategory = state.categories[userRole].find(
        (cat) => cat._id === category._id
      )

      if (!existingCategory) {
        state.categories[userRole].push(category)
      }
    },
    editCategory: (
      state,
      action: PayloadAction<{
        id: string
        field: keyof UserMainSubject
        value: UserMainSubjectFieldValues
        userRole: MainUserRole
      }>
    ) => {
      const { id, field, value, userRole } = action.payload
      const categoryToEdit = state.categories[userRole].find(
        (category) => category._id === id
      )

      if (categoryToEdit) {
        categoryToEdit[field] = value
      }
    },
    addSubjectToCategory: (
      state,
      action: PayloadAction<{
        id: string
        subject: SubjectNameInterface
        userRole: MainUserRole
      }>
    ) => {
      const { id, subject, userRole } = action.payload
      const existingCategory = state.categories[userRole].find(
        (category) => category._id === id
      )

      if (existingCategory) {
        const existingSubject = existingCategory.subjects.find(
          (sub) => sub._id === subject._id
        )

        if (!existingSubject) {
          existingCategory.subjects.push(subject)
        }
      }
    },
    removeSubjectFromCategory: (
      state,
      action: PayloadAction<{
        id: string
        subjectId: string
        userRole: MainUserRole
      }>
    ) => {
      const { id, subjectId, userRole } = action.payload
      const existingCategory = state.categories[userRole].find(
        (category) => category._id === id
      )

      if (existingCategory) {
        existingCategory.subjects = existingCategory.subjects.filter(
          (subject) => subject._id !== subjectId
        )
      }
    },
    deleteCategory: (
      state,
      action: PayloadAction<{
        id: string
        userRole: MainUserRole
      }>
    ) => {
      const { id, userRole } = action.payload
      state.categories[userRole] = state.categories[userRole].filter(
        (category) => category._id !== id
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = LoadingStatusEnum.Pending
        state.error = null
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = LoadingStatusEnum.Fulfilled
          updateStateFromPayload(state, action.payload)
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = LoadingStatusEnum.Rejected
        state.error = action.payload as string
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = LoadingStatusEnum.Pending
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = LoadingStatusEnum.Fulfilled
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = LoadingStatusEnum.Rejected
        state.error = action.payload as string
      })
  }
})

const { actions, reducer } = editProfileSlice

export const {
  setField,
  addCategory,
  editCategory,
  addSubjectToCategory,
  removeSubjectFromCategory,
  deleteCategory
} = actions

export default reducer