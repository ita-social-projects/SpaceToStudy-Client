import { ErrorOutlineRounded } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'
import Button from '~/design-system/components/button/Button'

import { styles } from './AcceptCooperationClosing.styles'

interface AcceptCooperationClosureProps {
  user: string
  onAccept: () => void
}

const AcceptCooperationClosing: React.FC<AcceptCooperationClosureProps> = ({
  user,
  onAccept
}) => {
  const { t } = useTranslation()

  return (
    <CooperationActionBanner
      actionButtons={
        <Button color='tonal-error' onClick={onAccept} size='xs'>
          {t('cooperationDetailsPage.acceptBtn')}
        </Button>
      }
      description={
        <>
          <Typography component='span' sx={styles.boldText}>
            {user}
          </Typography>
          {t('cooperationDetailsPage.closingMessage1')}
          <Typography component='span' sx={styles.boldText}>
            {t('cooperationDetailsPage.accessDuration')}
          </Typography>
          {t('cooperationDetailsPage.closingMessage2')}
        </>
      }
      icon={<ErrorOutlineRounded />}
      title={t('titles.acceptCooperationClosing')}
    />
  )
}

export default AcceptCooperationClosing
