import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { useModalContext } from '~/context/modal-context'
import { useAppSelector } from '~/hooks/use-redux'

const StudentHome = () => {
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
    <Box
      sx={{ backgroundColor: 'backgroundColor', flex: 1, overflowY: 'auto' }}
    >
      <Container data-testid='studentHome' sx={{ pt: 6 }}>
        {/* <FindTutorBlock />
        <PopularCategories />
        <StudentHowItWorks /> */}
        {/* <Faq /> */}
        StudentHome page
      </Container>
    </Box>
  )
}

export default StudentHome
