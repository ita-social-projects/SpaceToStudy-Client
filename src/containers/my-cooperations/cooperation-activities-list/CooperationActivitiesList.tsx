import Box from '@mui/material/Box'

import useForm from '~/hooks/use-form'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'

import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'
import { CourseSection, CourseResources } from '~/types'
import { useCooperationContext } from '~/context/cooperation-context'

const CooperationActivitiesList = () => {
  const { selectedCourse } = useCooperationContext()

  const { data, handleNonInputValueChange } = useForm<{
    sections: CourseSection[]
  }>({
    initialValues: { sections: [] },
    submitWithData: true
  })

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

  if (!data.sections.length && !selectedCourse) {
    addNewSection()
  }

  if (selectedCourse && !data.sections.length) {
    const allSections = selectedCourse.sections.map((section, index) => ({
      ...section,
      id: Date.now().toString() + index
    }))

    setSectionsData(allSections)
  }

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
