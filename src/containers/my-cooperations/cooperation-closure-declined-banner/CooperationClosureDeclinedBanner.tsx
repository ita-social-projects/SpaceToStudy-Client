import { useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import Button from '~/design-system/components/button/Button'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'

import { styles } from './CooperationClosureDeclinedBanner.styles'
import CooperationActionInput from '../cooperation-action-input/CooperationActionInput'

export interface CooperationClosureDeclinedBannerProps {
  message: string
  onSend: (answer: string) => void
  user: string
}

const CooperationClosureDeclinedBanner: React.FC<
  CooperationClosureDeclinedBannerProps
> = ({ message, onSend, user }) => {
  const { t } = useTranslation()
  const [isInputShown, setIsInputShown] = useState<boolean>(false)

  const handleResendRequest = () => {
    setIsInputShown(true)
  }

  return (
    <CooperationActionBanner
      actionButtons={
        <Button color='tonal-error' onClick={handleResendRequest} size='xs'>
          {t('cooperationDetailsPage.resendRequestBtn')}
        </Button>
      }
      description={
        <>
          <Typography component='span' sx={styles.boldText}>
            {user}
          </Typography>
          {` ${t('cooperationDetailsPage.cooperationCloseDeclinedMessage')}`}
          <Typography sx={styles.secondaryText}>{message}</Typography>
        </>
      }
      icon={<ErrorOutlineRounded />}
      title={t('titles.cooperationClosureDeclined')}
    >
      <CooperationActionInput
        isInputShown={isInputShown}
        onReasonSubmit={onSend}
        setIsInputShown={setIsInputShown}
      />
    </CooperationActionBanner>
  )
}

export default CooperationClosureDeclinedBanner
