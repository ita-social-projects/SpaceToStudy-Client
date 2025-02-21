import { useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
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
  message?: string
  submittedReason?: string
}

const AcceptCooperationClosing: React.FC<AcceptCooperationClosureProps> = ({
  user,
  isReasonSubmitted,
  onAccept,
  onReasonSubmit,
  message,
  submittedReason
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
          <Button onClick={onAccept} size='xs' variant='tonal-error'>
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
          {message && (
            <Box sx={styles.response}>
              <Typography component='span' sx={styles.boldText}>
                {t('cooperationDetailsPage.answer')}
                {user}:
              </Typography>
              <br />
              <Typography sx={styles.secondaryText}>{message}</Typography>
            </Box>
          )}
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
        submittedReason={submittedReason}
      />
    </CooperationActionBanner>
  )
}

export default AcceptCooperationClosing
