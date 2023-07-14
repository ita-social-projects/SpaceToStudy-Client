import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { useSelector } from 'react-redux'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'
import { useModalContext } from '~/context/modal-context'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

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
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        <StudentHowItWorks />
        <Faq />
      </Container>
    </Box>
  )
}

export default StudentHome
