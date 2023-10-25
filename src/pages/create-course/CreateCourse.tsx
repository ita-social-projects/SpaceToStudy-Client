import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'

import { authRoutes } from '~/router/constants/authRoutes'
import { ButtonTypeEnum, ButtonVariantEnum } from '~/types'

import { styles } from '~/pages/create-course/CreateCourse.styles'
import AddCourseBanner from '~/containers/add-course-banner/AddCourseBanner'
import React from 'react'

const CreateCourse = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const formData = new FormData()

  return (
    <PageWrapper>
      <AddCourseBanner formData={formData} />
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
