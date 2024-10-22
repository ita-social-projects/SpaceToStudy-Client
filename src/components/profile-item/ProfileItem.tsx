import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { styles } from '~/components/profile-item/ProfileItem.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ProfileItemType } from '~/components/profile-item/complete-profile.constants'
import { UserRoleEnum } from '~/types'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import { useDrawer } from '~/hooks/use-drawer'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { useAppDispatch } from '~/hooks/use-redux'

interface ProfileItemProps {
  item: ProfileItemType
  isFilled?: boolean
  userRole: UserRoleEnum | ''
}

const ProfileItem = ({
  item,
  userRole,
  isFilled = false
}: ProfileItemProps) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { id, icon } = item
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const handleOpenDrawer = () => openDrawer()

  const isClickable = !isFilled && item.id !== 'schedule'
  const isOffer = item.id === 'offer'

  const handleItemClick = () => {
    if (isClickable || isOffer) {
      navigate(`${item.path}#${item.id}`)
    }
    if (isOffer) {
      dispatch(
        openAlert({
          severity: snackbarVariants.success,
          message: `offerPage.createOffer.extendedSuccessMessage`,
          duration: 8000,
          isExtended: true
        })
      )
      // handleOpenDrawer()
    }
  }

  return (
    <Box
      onClick={handleItemClick}
      sx={{ ...styles.container, cursor: isClickable ? 'pointer' : '' }}
    >
      <Box sx={{ ...styles.wrapper, opacity: isFilled ? 0.5 : 1 }}>
        <Box sx={styles.information}>
          {!isMobile && <Box sx={styles.icon}>{icon}</Box>}
          <Box sx={styles.text}>
            <Typography variant={isMobile ? 'subtitle2' : 'h6'}>
              {userRole === UserRoleEnum.Student
                ? t(`completeProfileStudent.${id}.title`)
                : t(`completeProfileTutor.${id}.title`)}
            </Typography>
            <Typography variant={isMobile ? 'caption' : 'body2'}>
              {userRole === UserRoleEnum.Student
                ? t(`completeProfileStudent.${id}.subtitle`)
                : t(`completeProfileTutor.${id}.subtitle`)}
            </Typography>
          </Box>
        </Box>
        {isOffer && (
          <AppDrawer onClose={closeDrawer} open={isOpen}>
            <CreateOffer closeDrawer={closeDrawer} />
          </AppDrawer>
        )}
      </Box>
      {isFilled && (
        <CheckIcon
          data-testid={`icon-${item.id}`}
          fontSize={isMobile ? 'small' : 'medium'}
          sx={styles.checkIcon}
        />
      )}
    </Box>
  )
}

export default ProfileItem
