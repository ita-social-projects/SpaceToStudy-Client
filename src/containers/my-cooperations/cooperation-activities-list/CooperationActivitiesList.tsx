import Box from '@mui/material/Box'
import useForm from '~/hooks/use-form'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import {
  sectionInitialData,
  initialValues
} from '~/pages/create-course/CreateCourse.constants'
import { CourseForm, CourseSection, CourseResources } from '~/types'

const CooperationActivitiesList = () => {
  const { data, handleNonInputValueChange } = useForm<CourseForm>({
    initialValues,
    submitWithData: true
  })

  const setSectionsItems = (value: CourseSection[]) => {
    handleNonInputValueChange('sections', value)
  }

  const handleSectionInputChange = (
    id: string,
    field: keyof CourseSection,
    value: string
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
  }

  const handleSectionNonInputChange = (
    id: string,
    field: keyof CourseSection,
    value: CourseResources[]
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
    setSectionsItems(data.sections)
  }

  const createNewSection = () => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()
    setSectionsItems([...data.sections, newSectionData])
  }

  if (data.sections.length === 0) {
    createNewSection()
  }

  return (
    <Box>
      <CourseSectionsList
        handleSectionInputChange={handleSectionInputChange}
        handleSectionNonInputChange={handleSectionNonInputChange}
        items={data.sections}
        setSectionsItems={setSectionsItems}
        titleText='moduleTitle'
      />
    </Box>
  )
}

export default CooperationActivitiesList
