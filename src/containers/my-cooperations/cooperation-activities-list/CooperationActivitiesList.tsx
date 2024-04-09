import Box from '@mui/material/Box'

import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'

import { useEffect } from 'react'
import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'
import { CourseSection, CourseResources } from '~/types'
import { useCooperationContext } from '~/context/cooperation-context'

interface CooperationActivitiesListProps {
  data: { sections: CourseSection[] }
  handleNonInputValueChange: (key: 'sections', value: CourseSection[]) => void
}

const CooperationActivitiesList = ({
  data,
  handleNonInputValueChange
}: CooperationActivitiesListProps) => {
  const { selectedCourse, isAddedClicked, currentSectionIndex } =
    useCooperationContext()

  const setSectionsData = (value: CourseSection[]) => {
    handleNonInputValueChange('sections', value)
  }

  const handleSectionChange = (
    id: string,
    field: keyof CourseSection,
    value: string
  ) => {
    const sectionToEdit = data.sections.find((item) => item.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
  }

  const handleNonInputChange = (
    id: string,
    field: keyof CourseSection,
    value: CourseResources[]
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
    setSectionsData(data.sections)
  }

  const addNewSection = (index: number | undefined = undefined) => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()
    const newSections =
      index !== null
        ? [
            ...data.sections.slice(0, index),
            newSectionData,
            ...data.sections.slice(index)
          ]
        : [...data.sections, newSectionData]

    setSectionsData(newSections)
  }

  useEffect(() => {
    if (!data.sections.length && !isAddedClicked) {
      addNewSection()
    }

    if (selectedCourse && !data.sections.length && isAddedClicked) {
      const allSections = selectedCourse.sections.map((section, index) => ({
        ...section,
        id: Date.now().toString() + index
      }))
      setSectionsData(allSections)
    }

    if (selectedCourse && data.sections.length && isAddedClicked) {
      const addNewSectionsCourse = (index: number | undefined = undefined) => {
        const newSectionData = selectedCourse.sections.map(
          (section, index) => ({
            ...section,
            id: Date.now().toString() + index
          })
        )
        let newSections = []
        if (index !== undefined) {
          newSections = [
            ...data.sections.slice(0, index),
            ...newSectionData,
            ...data.sections.slice(index)
          ]
        } else {
          newSections = [...data.sections, ...newSectionData]
        }
        setSectionsData(newSections)
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
        handleSectionNonInputChange={handleNonInputChange}
        isCooperation
        items={data.sections}
        setSectionsItems={setSectionsData}
        titleText='moduleTitle'
      />
    </Box>
  )
}

export default CooperationActivitiesList
