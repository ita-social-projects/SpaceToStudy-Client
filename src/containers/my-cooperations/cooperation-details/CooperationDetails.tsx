import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/my-cooperations/cooperation-details/CooperationDetails.styles'
import { useParams } from 'react-router-dom'

const CooperationDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <PageWrapper>
      <Typography sx={styles.title}>
        {t('breadCrumbs.cooperationDetails')}
      </Typography>
      <Typography>Cooperation ID: {id}</Typography>
    </PageWrapper>
  )
}

export default CooperationDetails
