import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppCard from '~/components/app-card/AppCard'
import AppChip from '~/components/app-chip/AppChip'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'
import StatusChip from '~/components/status-chip/StatusChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { getFormatedDate } from '~/utils/helper-functions'
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
        <ImgTitleDescription
          description={getFormatedDate(cooperation.createdAt)}
          img={cooperation.user.photo}
          style={styles.imgTitleDescription}
          title={`${cooperation.user.firstName} ${cooperation.user.lastName}`}
        />
        <Box sx={styles.priceWithStatus}>
          <StatusChip status={cooperation.status} />
          <TitleWithDescription
            description={t('common.hourSlash')}
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
          {cooperation.requiredProficiencyLevel}
        </AppChip>
      </Box>
      <LanguagesListWithIcon languages={cooperation.requiredLanguage} />
      <Typography sx={styles.description}>
        {cooperation.offer.description}
      </Typography>
    </AppCard>
  )
}

export default CooperationCard
