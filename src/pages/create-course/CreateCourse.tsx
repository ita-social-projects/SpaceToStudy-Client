import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'

import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'
import AddCourseBanner from '~/containers/add-course-banner/AddCourseBanner'
import { authRoutes } from '~/router/constants/authRoutes'

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  SizeEnum,
  CourseSection
} from '~/types'
import { styles } from '~/pages/create-course/CreateCourse.styles'

const CreateCourse = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [sectionsItems, setSectionsItems] = useState<CourseSection[]>([])

  const createNewSection = () => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = sectionsItems.length
    setSectionsItems([...sectionsItems, newSectionData])
  }

  if (sectionsItems.length === 0) {
    createNewSection()
  }

  const onAddSectionClick = () => {
    createNewSection()
  }

  const formData = new FormData()

  return (
    <PageWrapper>
      <AddCourseBanner formData={formData} />
      <CourseSectionsList
        items={sectionsItems}
        setSectionsItems={setSectionsItems}
      />
      <Box sx={styles.functionalButton}>
        <AppButton
          onClick={onAddSectionClick}
          size={SizeEnum.Medium}
          variant={ButtonVariantEnum.Tonal}
        >
          <AddIcon fontSize={SizeEnum.Small} />
          {t('course.addSectionBtn')}
        </AppButton>
      </Box>
      <Box sx={styles.buttons}>
        <AppButton
          onClick={() => navigate(authRoutes.myCourses.root.path)}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('common.cancel')}
        </AppButton>
        <AppButton disabled type={ButtonTypeEnum.Submit}>
          {t('common.save')}
        </AppButton>
      </Box>
    </PageWrapper>
  )
}

export default CreateCourse
