import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux/store'
import { sliceNames } from '~/redux/redux.constants'
import {
  CourseFieldValues,
  CourseResource,
  CourseSection,
  ResourceAvailabilityStatusEnum,
  ResourceAvailability,
  ResourcesAvailabilityEnum,
  StatusEnum
} from '~/types'

interface CooperationsState {
  isActivityCreated: boolean
  sections: CourseSection[]
  resourcesAvailability: ResourcesAvailabilityEnum
  status: StatusEnum
}

const initialState: CooperationsState = {
  isActivityCreated: false,
  sections: [],
  resourcesAvailability: ResourcesAvailabilityEnum.OpenAll,
  status: StatusEnum.Active
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
    setIsActivityCreated(
      state,
      action: PayloadAction<CooperationsState['isActivityCreated']>
    ) {
      state.isActivityCreated = action.payload
    },
    setCooperationSections(
      state,
      action: PayloadAction<CooperationsState['sections']>
    ) {
      state.sections = (action.payload ?? []).map((section) => ({
        ...section,
        id: crypto.randomUUID(),
        resources: (section.resources ?? []).map((resource) => ({
          ...resource,
          resource: { ...resource.resource, id: crypto.randomUUID() }
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
      newSectionData.id = crypto.randomUUID()
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
              id: _id,
              ...(isDuplicate ? { _id: _id, isDuplicate: true } : { _id })
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

      section.resources = action.payload.resources.map(
        ({ availability, ...resource }) => ({
          resource,
          resourceType: resource.resourceType,
          availability
        })
      )
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
          item.availability = {
            status,
            date: null
          }
        })
      }
    },
    updateResourceAvailability(
      state,
      action: PayloadAction<{
        sectionId: CourseSection['id']
        resourceId: CourseResource['id']
        availability: ResourceAvailability
      }>
    ) {
      const { sectionId, resourceId, availability } = action.payload

      for (const section of state.sections ?? []) {
        if (section.id === sectionId) {
          for (const resource of section.resources) {
            if (resource.resource.id === resourceId) {
              resource.availability = availability
              return
            }
          }
        }
      }
    },
    setCooperationStatus(state, action: PayloadAction<StatusEnum>) {
      state.status = action.payload
    }
  }
})

const { actions, reducer } = cooperationsSlice

export const {
  setIsActivityCreated,
  setCooperationSections,
  addNewCooperationSection,
  updateCooperationSection,
  deleteCooperationSection,
  addSectionResources,
  updateResourcesOrder,
  updateResource,
  deleteResource,
  setResourcesAvailability,
  updateResourceAvailability,
  setCooperationStatus
} = actions

export const cooperationsSelector = (state: RootState) => state.cooperations

export default reducer
