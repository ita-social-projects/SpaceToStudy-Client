import { useEffect } from 'react'
import { useAppSelector } from '~/hooks/use-redux'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useModalContext } from '~/context/modal-context'
import { styles } from '~/pages/tutor-home/TutorHome.styles'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'

const TutorHome = () => {
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
      <OfferRequestBlock />
    </PageWrapper>
  )
}

export default TutorHome
