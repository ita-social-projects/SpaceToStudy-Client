import Box from '@mui/material/Box'

import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'

import { useEffect } from 'react'
import { CourseSection, CourseResource, CourseFieldValues } from '~/types'
import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'
import {
  cooperationsSelector,
  setCooperationSections,
  updateCooperationSection
} from '~/redux/features/cooperationsSlice'
import { initialCooperationSectionData } from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList.constants'

const CooperationActivitiesList = () => {
  const {
    selectedCourse,
    isAddedClicked,
    currentSectionIndex,
    isNewActivity,
    sections
  } = useAppSelector(cooperationsSelector)
  const dispatch = useAppDispatch()

  const setSectionsData = (value: CourseSection[]) => {
    dispatch(setCooperationSections(value))
  }
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

  const addNewSection = (index: number | undefined = undefined) => {
    const newSectionData = { ...initialCooperationSectionData }
    newSectionData.id = Date.now().toString()
    const newSections =
      index !== null
        ? [
            ...sections.slice(0, index),
            newSectionData,
            ...sections.slice(index)
          ]
        : [...sections, newSectionData]

    setSectionsData(newSections)
  }

  useEffect(() => {
    if (!sections.length && !isAddedClicked && isNewActivity) {
      addNewSection()
    }

    if (selectedCourse && !sections.length && isAddedClicked) {
      const allSections = selectedCourse.sections.map((section, index) => ({
        ...section,
        id: Date.now().toString() + index
      }))
      setSectionsData(allSections)
    }

    if (selectedCourse && sections.length && isAddedClicked) {
      const addNewSectionsCourse = (index: number | undefined = undefined) => {
        const newSectionData = selectedCourse.sections.map(
          (section, index) => ({
            ...section,
            id: Date.now().toString() + index
          })
        )
        let newSections: CourseSection[]
        if (index !== undefined) {
          newSections = [
            ...sections.slice(0, index),
            ...newSectionData,
            ...sections.slice(index)
          ]
        } else {
          newSections = [...sections, ...newSectionData]
        }
        ;() => setSectionsData(newSections)
      }
      addNewSectionsCourse(currentSectionIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddedClicked])

  return (
    <Box>
      <CourseSectionsList
        addNewSection={addNewSection}
        handleSectionInputChange={handleSectionChange}
        handleSectionNonInputChange={handleSectionChange}
        isCooperation
        items={sections}
        setSectionsItems={setSectionsData}
        titleText='moduleTitle'
      />
    </Box>
  )
}

export default CooperationActivitiesList
