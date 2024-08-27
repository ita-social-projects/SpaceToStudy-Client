import { useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import { initialCooperationSectionData } from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList.constants'

import {
  CourseSection,
  CourseResource,
  CourseFieldValues,
  ResourceEventHandler,
  SectionEventHandler,
  CourseSectionEventType,
  CourseResourceEventType
} from '~/types'
import {
  cooperationsSelector,
  deleteCooperationSection,
  deleteResource,
  setCooperationSections,
  setIsNewActivity,
  addSectionResources,
  updateCooperationSection,
  updateResource,
  updateResourcesOrder
} from '~/redux/features/cooperationsSlice'

import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'

const CooperationActivitiesList = () => {
  const { selectedCourse, isAddedClicked, isNewActivity, sections } =
    useAppSelector(cooperationsSelector)

  const dispatch = useAppDispatch()

  // This logic looks very complicated and seems that it doesn't work
  // Why do we need to store some flags for user actions?
  // isAddedClicked works even when we don't click, that adds unnecessary sections
  useEffect(() => {
    if (!sections?.length && !isAddedClicked && isNewActivity) {
      addNewSection()
    }

    if (selectedCourse && !sections.length && isAddedClicked) {
      const allSections = selectedCourse.sections.map((section) => ({
        ...section,
        id: uuidv4()
      }))
      setSectionsData(allSections)
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
        setSectionsData(newSections)
      }
      addNewSectionsCourse(0) // this is a mock and will always insert at the 0 position, but it will change in issue #2064
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddedClicked])

  const setSectionsData = useCallback(
    (sections: CourseSection[]) => {
      dispatch(setCooperationSections(sections))
    },
    [dispatch]
  )

  const handleSectionChange = (
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
  }

  const addNewSection = useCallback(
    (index: number | undefined = undefined) => {
      // This logic should be moved to the reducer
      const newSectionData = { ...initialCooperationSectionData }
      newSectionData.id = uuidv4()
      const newSections = [...sections]
      newSections.splice(index ?? sections.length, 0, newSectionData)

      setSectionsData(newSections)
    },
    [sections, setSectionsData]
  )

  const deleteSection = useCallback(
    (sectionId: string) => {
      dispatch(setIsNewActivity(false)) // Why do we need this flag here? (moved from the child component)
      dispatch(deleteCooperationSection(sectionId))
    },
    [dispatch]
  )

  const sectionEventHandler = useCallback<SectionEventHandler>(
    (event) => {
      switch (event.type) {
        case CourseSectionEventType.SectionAdded:
          addNewSection(event.index)
          break
        case CourseSectionEventType.SectionRemoved:
          deleteSection(event.sectionId)
          break
        case CourseSectionEventType.SectionsOrderChange:
          setSectionsData(event.sections)
          break
      }
    },
    [addNewSection, deleteSection, setSectionsData]
  )

  const resourceEventHandler = useCallback<ResourceEventHandler>(
    (event) => {
      switch (event.type) {
        case CourseResourceEventType.ResourceUpdated:
          dispatch(
            updateResource({
              sectionId: event.sectionId,
              resourceId: event.resourceId,
              resource: event.resource
            })
          )
          break
        case CourseResourceEventType.ResourcesOrderChange:
          dispatch(
            updateResourcesOrder({
              sectionId: event.sectionId,
              resources: event.resources
            })
          )
          break
        case CourseResourceEventType.AddSectionResources:
          dispatch(
            addSectionResources({
              sectionId: event.sectionId,
              resources: event.resources,
              isDuplicate: event.isDuplicate
            })
          )
          break
        case CourseResourceEventType.ResourceRemoved:
          dispatch(
            deleteResource({
              sectionId: event.sectionId,
              resourceId: event.resourceId
            })
          )
          break
      }
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
