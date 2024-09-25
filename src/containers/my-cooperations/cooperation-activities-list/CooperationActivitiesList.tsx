import { useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AnyAction } from '@reduxjs/toolkit'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'

import {
  CourseFieldValues,
  CourseResource,
  CourseResourceEventType,
  CourseSection,
  CourseSectionEventType,
  ResourceEvent,
  SectionEvent
} from '~/types'
import {
  cooperationsSelector,
  setCooperationSections,
  deleteCooperationSection,
  updateCooperationSection,
  addNewCooperationSection,
  updateResourceAvailability,
  deleteResource,
  updateResource,
  addSectionResources,
  updateResourcesOrder
} from '~/redux/features/cooperationsSlice'

import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'

const resourceHandlers: Record<
  CourseResourceEventType,
  (event: ResourceEvent) => AnyAction | null
> = {
  [CourseResourceEventType.ResourceUpdated]: (event) => {
    return event.type === CourseResourceEventType.ResourceUpdated
      ? updateResource({
          sectionId: event.sectionId,
          resourceId: event.resourceId,
          resource: event.resource
        })
      : null
  },
  [CourseResourceEventType.ResourcesOrderChange]: (event) => {
    return event.type === CourseResourceEventType.ResourcesOrderChange
      ? updateResourcesOrder({
          sectionId: event.sectionId,
          resources: event.resources
        })
      : null
  },
  [CourseResourceEventType.AddSectionResources]: (event) => {
    return event.type === CourseResourceEventType.AddSectionResources
      ? addSectionResources({
          sectionId: event.sectionId,
          resources: event.resources,
          isDuplicate: event.isDuplicate
        })
      : null
  },
  [CourseResourceEventType.ResourceRemoved]: (event) => {
    return event.type === CourseResourceEventType.ResourceRemoved
      ? deleteResource({
          sectionId: event.sectionId,
          resourceId: event.resourceId
        })
      : null
  },
  [CourseResourceEventType.ResourceUpdateAvailability]: (event) => {
    return event.type === CourseResourceEventType.ResourceUpdateAvailability
      ? updateResourceAvailability({
          sectionId: event.sectionId,
          resourceId: event.resourceId,
          availability: event.availability
        })
      : null
  }
}

const sectionHandlers: Record<
  CourseSectionEventType,
  (event: SectionEvent) => AnyAction | null
> = {
  [CourseSectionEventType.SectionAdded]: (event) => {
    return event.type === CourseSectionEventType.SectionAdded
      ? addNewCooperationSection({ index: event.index })
      : null
  },
  [CourseSectionEventType.SectionRemoved]: (event) => {
    return event.type === CourseSectionEventType.SectionRemoved
      ? deleteCooperationSection(event.sectionId)
      : null
  },
  [CourseSectionEventType.SectionsOrderChange]: (event) => {
    return event.type === CourseSectionEventType.SectionsOrderChange
      ? setCooperationSections(event.sections)
      : null
  }
}

const CooperationActivitiesList = () => {
  const dispatch = useAppDispatch()
  const { selectedCourse, isAddedClicked, sections } =
    useAppSelector(cooperationsSelector)

  // This logic looks very complicated and seems that it doesn't work
  // Why do we need to store some flags for user actions?
  // isAddedClicked works even when we don't click, that adds unnecessary sections
  useEffect(() => {
    // if (!sections?.length && !isAddedClicked && isNewActivity) { // commented because this if causes adding two sections
    //   dispatch(addNewCooperationSection({ index: 0 })) // should check and rewrite this logic
    // }

    if (selectedCourse && !sections.length && isAddedClicked) {
      const allSections = selectedCourse.sections.map((section) => ({
        ...section,
        id: uuidv4()
      }))
      dispatch(setCooperationSections(allSections))
    }

    if (selectedCourse && sections.length && isAddedClicked) {
      const addNewSectionsCourse = (index: number | undefined = undefined) => {
        const newSectionData = selectedCourse.sections.map((section) => ({
          ...section,
          id: uuidv4()
        }))
        let newSections
        if (index !== undefined) {
          newSections = [
            ...sections.slice(0, index),
            ...newSectionData,
            ...sections.slice(index)
          ]
        } else {
          newSections = [...sections, ...newSectionData]
        }
        dispatch(setCooperationSections(newSections))
      }
      addNewSectionsCourse(0) // this is a mock and will always insert at the 0 position, but it will change in issue #2064
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddedClicked])

  const handleSectionChange = useCallback(
    (
      id: string,
      field: keyof CourseSection,
      value: string | CourseResource[]
    ) => {
      dispatch(
        updateCooperationSection({
          id,
          field,
          value: value as CourseFieldValues
        })
      )
    },
    [dispatch]
  )

  const sectionEventHandler = useCallback(
    (event: SectionEvent) => {
      const action = sectionHandlers[event.type]?.(event)
      if (action) dispatch(action)
    },
    [dispatch]
  )

  const resourceEventHandler = useCallback(
    (event: ResourceEvent) => {
      const action = resourceHandlers[event.type]?.(event)
      if (action) dispatch(action)
    },
    [dispatch]
  )

  if (sections === undefined) {
    return <Loader />
  }

  return (
    <Box>
      <CourseSectionsList
        handleSectionInputChange={handleSectionChange}
        isCooperation
        items={sections}
        resourceEventHandler={resourceEventHandler}
        sectionEventHandler={sectionEventHandler}
        titleText='moduleTitle'
      />
    </Box>
  )
}

export default CooperationActivitiesList
