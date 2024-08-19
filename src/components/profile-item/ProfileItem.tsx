import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { styles } from '~/components/profile-item/ProfileItem.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ProfileItemType } from '~/components/profile-item/complete-profile.constants'
import { UserRoleEnum } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'

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

  const handleItemClick = () => {
    switch (item.id) {
      case 'photo':
        navigate(`${authRoutes.editProfile.path}#photo`)
        break
      case 'video':
        navigate(`${authRoutes.editProfile.path}#video`)
        break
    }
  }

  return (
    <Box
      onClick={handleItemClick}
      sx={{ position: 'relative', cursor: 'pointer' }}
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
