import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppCard from '~/components/app-card/AppCard'
import AppChip from '~/components/app-chip/AppChip'
import StatusChip from '~/components/status-chip/StatusChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import { Cooperation } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperation-card/CooperationCard.styles'

interface CooperationCardProps {
  cooperation: Cooperation
}

const CooperationCard: FC<CooperationCardProps> = ({ cooperation }) => {
  const { t } = useTranslation()
  return (
    <AppCard sx={styles.root}>
      <Box sx={styles.userInfo}>
        <UserProfileInfo
          date={cooperation.updatedAt}
          firstName={cooperation.user.firstName}
          lastName={cooperation.user.lastName}
          photo={cooperation.user.photo}
          sx={styles.userProfileInfo}
        />
        <Box sx={styles.priceWithStatus}>
          <StatusChip status={cooperation.status} />
          <TitleWithDescription
            description={`/ ${t('common.hour')}`}
            style={styles.price}
            title={`${cooperation.price} ${t('common.uah')}`}
          />
        </Box>
      </Box>
      <Box sx={styles.chipBox}>
        <AppChip labelSx={styles.chipLabel}>
          {cooperation.offer.subject.name}
        </AppChip>
        <AppChip labelSx={styles.chipLabel}>
          {cooperation.proficiencyLevel}
        </AppChip>
      </Box>
      <Typography sx={styles.title}>{cooperation.offer.title}</Typography>
    </AppCard>
  )
}

export default CooperationCard
