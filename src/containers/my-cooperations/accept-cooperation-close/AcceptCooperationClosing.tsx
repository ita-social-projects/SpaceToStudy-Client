import { useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'
import CooperationActionInput from '../cooperation-action-input/CooperationActionInput'
import Button from '~/design-system/components/button/Button'

import { styles } from './AcceptCooperationClosing.styles'

interface AcceptCooperationClosureProps {
  user: string
  isReasonSubmitted: boolean
  onAccept: () => void
  onReasonSubmit: (reason: string) => void
}

const AcceptCooperationClosing: React.FC<AcceptCooperationClosureProps> = ({
  user,
  isReasonSubmitted,
  onAccept,
  onReasonSubmit
}) => {
  const { t } = useTranslation()
  const [isInputShown, setIsInputShown] = useState<boolean>(false)

  const handleDeclineClick = () => {
    setIsInputShown(true)
  }

  return (
    <CooperationActionBanner
      actionButtons={
        <>
          <Button color='tonal-error' onClick={onAccept} size='xs'>
            {t('cooperationDetailsPage.acceptBtn')}
          </Button>
          <Button
            disabled={isReasonSubmitted}
            onClick={handleDeclineClick}
            size='xs'
          >
            {t('cooperationDetailsPage.declineBtn')}
          </Button>
        </>
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
    >
      <CooperationActionInput
        inputLabel={t('cooperationDetailsPage.declineInputFieldLabel')}
        inputPlaceholderMessage={t(
          t('cooperationDetailsPage.declineInputFieldPlaceholder')
        )}
        isInputShown={isInputShown}
        isReasonSubmitted={isReasonSubmitted}
        onReasonSubmit={onReasonSubmit}
        setIsInputShown={setIsInputShown}
      />
    </CooperationActionBanner>
  )
}

export default AcceptCooperationClosing
