import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/profile-item/ProfileItem.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { ProfileItemType } from '~/components/profile-item/complete-profile.constants'
import { UserRoleEnum } from '~/types'

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

  return (
    <Box sx={{ position: 'relative' }}>
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
