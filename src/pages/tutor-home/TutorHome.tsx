import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import FindBlock from '~/components/find-block/FindBlock'
import ActiveStudentsBlock from '~/components/active-students/ActiveStudentsBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import TutorSchedule from '~/components/tutor-schedule/TutorSchedule'

const TutorHome = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
      <ActiveStudentsBlock />
      <PopularCategories
        description={t('tutorHomePage.popularCategories.description')}
        title={t('tutorHomePage.popularCategories.title')}
      />
      <TutorSchedule />
    </PageWrapper>
  )
}

export default TutorHome
