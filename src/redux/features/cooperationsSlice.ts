import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Course } from '~/types'
import { RootState } from '../store'
import { sliceNames } from '../redux.constants'

interface CooperationsState {
  selectedCourse: Course | null
  isActivityCreated: boolean
  isAddedClicked: boolean
  currentSectionIndex?: number
}

const initialState: CooperationsState = {
  selectedCourse: null,
  isActivityCreated: false,
  isAddedClicked: false,
  currentSectionIndex: 0
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
    setCurrentSectionIndex(
      state,
      action: PayloadAction<CooperationsState['currentSectionIndex']>
    ) {
      state.currentSectionIndex = action.payload
    }
  }
})

const { actions, reducer } = cooperationsSlice

export const {
  setSelectedCourse,
  setIsActivityCreated,
  setIsAddedClicked,
  setCurrentSectionIndex
} = actions

export const cooperationsSelector = (state: RootState) => state.cooperations

export default reducer
