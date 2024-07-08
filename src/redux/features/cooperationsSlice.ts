import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux/store'
import { sliceNames } from '~/redux/redux.constants'
import {
  Course,
  CourseFieldValues,
  CourseResource,
  CourseSection,
  ResourceAvailabilityStatusEnum,
  ResourcesAvailabilityEnum
} from '~/types'
import {
  getSectionResourceField,
  recalculateResourceOrder,
  updateAvailabilityStatus
} from '~/utils/course-resource-helpers'

interface CooperationsState {
  selectedCourse: Course | null // delete it
  isActivityCreated: boolean // delete it
  isAddedClicked: boolean // delete it
  isNewActivity: boolean // delete it
  currentSectionIndex?: number // delete it
  sections: CourseSection[]
  resourcesAvailability: ResourcesAvailabilityEnum
}

const initialState: CooperationsState = {
  selectedCourse: null, // delete it
  isActivityCreated: false, // delete it
  isAddedClicked: false, // delete it
  isNewActivity: false, // delete it
  currentSectionIndex: 0, // delete it
  sections: [],
  resourcesAvailability: ResourcesAvailabilityEnum.OpenAll
}

const cooperationsSlice = createSlice({
  name: sliceNames.cooperations,
  initialState,
  reducers: {
    setSelectedCourse(
      // delete it
      state,
      action: PayloadAction<CooperationsState['selectedCourse']>
    ) {
      state.selectedCourse = action.payload
    },
    setIsActivityCreated(
      // delete it
      state,
      action: PayloadAction<CooperationsState['isActivityCreated']>
    ) {
      state.isActivityCreated = action.payload
    },
    setIsAddedClicked(
      // delete it
      state,
      action: PayloadAction<CooperationsState['isAddedClicked']>
    ) {
      state.isAddedClicked = action.payload
    },
    setIsNewActivity(
      // delete it
      state,
      action: PayloadAction<CooperationsState['isNewActivity']>
    ) {
      state.isNewActivity = action.payload
    },
    setCurrentSectionIndex(
      // delete it
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
    },

    deleteCooperationSection(
      state,
      action: PayloadAction<CourseSection['id']>
    ) {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      )
    },

    setSectionResources(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceType: CourseResource['resourceType']
        resources: CourseResource[]
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      const { resourceType, resources } = action.payload
      const resourceField = getSectionResourceField(resourceType)

      if (!resourceField) return
      ;(section[resourceField] as CourseResource[]) = resources

      section.order = recalculateResourceOrder(section.order ?? [], section)
    },

    updateResourcesOrder(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resources: CourseResource[]
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (section) {
        section.order = action.payload.resources.map((resource) => resource._id)
      }
    },

    updateResource(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceType: CourseResource['resourceType']
        resourceId: CourseResource['_id']
        resource: Partial<CourseResource>
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      const { resourceType, resourceId, resource } = action.payload
      const resourceField = getSectionResourceField(resourceType)

      if (!resourceField) return

      const resourceIndex = section[resourceField].findIndex(
        (res) => res._id === resourceId
      )

      if (resourceIndex >= 0) {
        section[resourceField][resourceIndex] = {
          ...section[resourceField][resourceIndex],
          ...resource
        } as CourseResource
      }
    },

    deleteResource(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceType: CourseResource['resourceType']
        resourceId: CourseResource['_id']
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      const { resourceType, resourceId } = action.payload
      const resourceField = getSectionResourceField(resourceType)

      if (!resourceField) return
      ;(section[resourceField] as CourseResource[]) = section[
        resourceField
      ].filter((res) => res._id !== resourceId)

      section.order = recalculateResourceOrder(section.order ?? [], section)
    },

    setResourcesAvailability(
      state,
      action: PayloadAction<CooperationsState['resourcesAvailability']>
    ) {
      state.resourcesAvailability = action.payload
      const status: ResourceAvailabilityStatusEnum =
        action.payload === ResourcesAvailabilityEnum.OpenAll
          ? ResourceAvailabilityStatusEnum.Open
          : ResourceAvailabilityStatusEnum.Closed

      for (const section of state.sections ?? []) {
        updateAvailabilityStatus(section.lessons, status)
        updateAvailabilityStatus(section.quizzes, status)
        updateAvailabilityStatus(section.attachments, status)
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
  updateCooperationSection,
  deleteCooperationSection,
  setSectionResources,
  updateResourcesOrder,
  updateResource,
  deleteResource,
  setResourcesAvailability
} = actions

export const cooperationsSelector = (state: RootState) => state.cooperations

export default reducer
