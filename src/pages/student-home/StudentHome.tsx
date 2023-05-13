import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const StudentHome = () => {
  const { t } = useTranslation()

  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindTutorBlock />
      <PopularCategories
        description={t('studentHomePage.popularCategories.description')}
        title={t('studentHomePage.popularCategories.title')}
      />
      <StudentHowItWorks />
      <Faq />
    </Container>
  )
}

export default StudentHome
