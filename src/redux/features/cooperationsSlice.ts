import { v4 as uuidv4 } from 'uuid'
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

interface CooperationsState {
  selectedCourse: Course | null // delete it
  isActivityCreated: boolean // delete it
  isAddedClicked: boolean // delete it
  isNewActivity: boolean // delete it
  sections: CourseSection[]
  resourcesAvailability: ResourcesAvailabilityEnum
}

const initialState: CooperationsState = {
  selectedCourse: null, // delete it
  isActivityCreated: false, // delete it
  isAddedClicked: false, // delete it
  isNewActivity: false, // delete it
  sections: [],
  resourcesAvailability: ResourcesAvailabilityEnum.OpenAll
}

export const initialCooperationSectionData: CourseSection = {
  id: '',
  title: '',
  description: '',
  resources: []
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

    setCooperationSections(
      state,
      action: PayloadAction<CooperationsState['sections']>
    ) {
      state.sections = (action.payload ?? []).map((section) => ({
        ...section,
        id: uuidv4(),
        resources: (section.resources ?? []).map((resource) => ({
          ...resource,
          resource: { ...resource.resource, id: uuidv4() }
        }))
      }))
    },

    addNewCooperationSection(
      state,
      action: PayloadAction<{
        index: number | undefined
      }>
    ) {
      const newSectionData = { ...initialCooperationSectionData }
      newSectionData.id = uuidv4()
      const newSections = [...state.sections]
      newSections.splice(
        action.payload.index ?? state.sections.length,
        0,
        newSectionData
      )
      state.sections = newSections
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

    addSectionResources(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resources: CourseResource[]
        isDuplicate?: boolean
      }>
    ) {
      const isDuplicate = action.payload.isDuplicate
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      const newResources = action.payload.resources
        .filter((resource) => {
          return !section.resources.some(
            (item) => item.resource.id === resource.id && !isDuplicate
          )
        })
        .map((resource) => {
          const { _id, ...newDuplicateResource } = resource
          return {
            resource: {
              ...newDuplicateResource,
              id: uuidv4(),
              ...(isDuplicate ? { _id: '', isDuplicate: true } : { _id })
            },
            resourceType: resource.resourceType
          }
        })

      section.resources = [...section.resources, ...newResources]
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

      if (!section) return

      section.resources = action.payload.resources.map((resource) => ({
        resource,
        resourceType: resource.resourceType
      }))
    },

    updateResource(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceId: CourseResource['id']
        resource: Partial<CourseResource>
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      const resource = section.resources.find(
        (item) => item.resource.id === action.payload.resourceId
      )

      if (!resource) return

      resource.resource = {
        ...resource.resource,
        ...action.payload.resource
      } as CourseResource
    },

    deleteResource(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceId: CourseResource['id']
      }>
    ) {
      const section = state.sections.find(
        (section) => section.id === action.payload.sectionId
      )

      if (!section) return

      section.resources = section.resources.filter(
        (item) => item.resource.id !== action.payload.resourceId
      )
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
        section.resources.forEach((item) => {
          item.resource.availability = {
            status,
            date: null
          }
        })
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
  setCooperationSections,
  addNewCooperationSection,
  updateCooperationSection,
  deleteCooperationSection,
  addSectionResources,
  updateResourcesOrder,
  updateResource,
  deleteResource,
  setResourcesAvailability
} = actions

export const cooperationsSelector = (state: RootState) => state.cooperations

export default reducer
