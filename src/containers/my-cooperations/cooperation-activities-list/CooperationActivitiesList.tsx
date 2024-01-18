import Box from '@mui/material/Box'
import useForm from '~/hooks/use-form'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import {
  sectionInitialData,
  initialValues
} from '~/pages/create-course/CreateCourse.constants'
import { CourseForm, CooperationSection, CourseResources } from '~/types'

const CooperationActivitiesList = () => {
  const { data, handleNonInputValueChange } = useForm<CourseForm>({
    initialValues,
    submitWithData: true
  })

  const setSectionsData = (value: CooperationSection[]) => {
    handleNonInputValueChange('sections', value)
  }

  const handleSectionChange = (
    id: string,
    field: keyof CooperationSection,
    value: string
  ) => {
    const sectionToEdit = data.sections.find((item) => item.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
  }

  const handleNonInputChange = (
    id: string,
    field: keyof CooperationSection,
    value: CourseResources[]
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
    setSectionsData(data.sections)
  }

  const addNewSection = (index = null) => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()
    let newSections = [...data.sections]

    if (index !== null) {
      newSections = [
        ...newSections.slice(0, index),
        newSectionData,
        ...newSections.slice(index)
      ]
    } else {
      newSections.push(newSectionData)
    }

    setSectionsData(newSections)
  }

  if (data.sections.length === 0) {
    addNewSection()
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
