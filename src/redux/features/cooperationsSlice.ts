import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Course, CourseFieldValues, CourseSection } from '~/types'
import { RootState } from '../store'
import { sliceNames } from '../redux.constants'

interface CooperationsState {
  selectedCourse: Course | null
  isActivityCreated: boolean
  isAddedClicked: boolean
  isNewActivity: boolean
  currentSectionIndex?: number
  sections: CourseSection[]
}

const initialState: CooperationsState = {
  selectedCourse: null,
  isActivityCreated: false,
  isAddedClicked: false,
  isNewActivity: false,
  currentSectionIndex: 0,
  sections: []
}

const cooperationsSlice = createSlice({
  name: sliceNames.cooperations,
  initialState,
  reducers: {
    setSelectedCourse(
      state,
      action: PayloadAction<CooperationsState['selectedCourse']>
    ) {
      state.selectedCourse = action.payload
    },
    setIsActivityCreated(
      state,
      action: PayloadAction<CooperationsState['isActivityCreated']>
    ) {
      state.isActivityCreated = action.payload
    },
    setIsAddedClicked(
      state,
      action: PayloadAction<CooperationsState['isAddedClicked']>
    ) {
      state.isAddedClicked = action.payload
    },
    setIsNewActivity(
      state,
      action: PayloadAction<CooperationsState['isNewActivity']>
    ) {
      state.isNewActivity = action.payload
    },
    setCurrentSectionIndex(
      state,
      action: PayloadAction<CooperationsState['currentSectionIndex']>
    ) {
      state.currentSectionIndex = action.payload
    },
    setCooperationSections(
      state,
      action: PayloadAction<CooperationsState['sections']>
    ) {
      state.sections = action.payload
    },
    updateCooperationSection(
      state,
      action: PayloadAction<{
        id: string
        field: keyof CourseSection
        value: CourseFieldValues
      }>
    ) {
      const sectionToEdit = state.sections.find(
        (section) => section.id === action.payload.id
      ) as CourseSection

      if (sectionToEdit) {
        sectionToEdit[action.payload.field] = action.payload.value
      }
    }
  }
})

const { actions, reducer } = cooperationsSlice

export const {
  setSelectedCourse,
  setIsActivityCreated,
  setIsAddedClicked,
  setIsNewActivity,
  setCurrentSectionIndex,
  setCooperationSections,
  updateCooperationSection
} = actions

export const cooperationsSelector = (state: RootState) => state.cooperations

export default reducer
