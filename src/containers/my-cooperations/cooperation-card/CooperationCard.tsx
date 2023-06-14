import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppCard from '~/components/app-card/AppCard'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
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
  const { user, offer, updatedAt, proficiencyLevel, price, status } =
    cooperation

  return (
    <AppCard sx={styles.root}>
      <Box sx={styles.userInfo}>
        <UserProfileInfo
          _id={cooperation.user._id}
          date={updatedAt}
          firstName={user.firstName}
          lastName={user.lastName}
          photo={user.photo}
          role={user.role}
          sx={styles.userProfileInfo}
        />
        <Box sx={styles.priceWithStatus}>
          <StatusChip status={status} />
          <TitleWithDescription
            description={`/ ${t('common.hour')}`}
            style={styles.price}
            title={`${price} ${t('common.uah')}`}
          />
        </Box>
      </Box>
      <SubjectLevelChips
        color={offer.category.appearance.color}
        proficiencyLevel={proficiencyLevel}
        subject={offer.subject.name}
        sx={styles.chipBox}
      />
      <Typography sx={styles.title}>{cooperation.offer.title}</Typography>
    </AppCard>
  )
}

export default CooperationCard
