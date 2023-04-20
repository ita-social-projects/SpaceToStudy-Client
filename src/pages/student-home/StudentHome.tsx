import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'
import { defaultResponses } from '~/constants'
import { CategoryInterface } from '~/types'

const StudentHome = () => {
  const { t } = useTranslation()

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: 9 }),
    []
  )
  const { response: categoriesData, loading: categoriesLoading } = useAxios<
    CategoryInterface[]
  >({
    service: getCategories,
    defaultResponse: defaultResponses.array
  })

  return (
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        <FindTutorBlock />
        <PopularCategories
          description={t('studentHomePage.popularCategories.description')}
          items={categoriesData}
          loading={categoriesLoading}
          title={t('studentHomePage.popularCategories.title')}
        />
        <StudentHowItWorks />
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
