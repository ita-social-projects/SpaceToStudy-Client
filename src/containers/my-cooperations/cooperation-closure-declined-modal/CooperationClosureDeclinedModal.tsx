import { useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import Button from '~/design-system/components/button/Button'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'

import { styles } from './CooperationClosureDeclinedModal.styles'

export interface CooperationClosureDeclinedModalProps {
  message: string
  onReasonSubmit: (reason: string) => void
  onSend: () => void
  user: string
}

const CooperationClosureDeclinedModal: React.FC<
  CooperationClosureDeclinedModalProps
> = ({ message, onReasonSubmit, onSend, user }) => {
  const { t } = useTranslation()
  const [isInputShown, setIsInputShown] = useState<boolean>(false)
  const [isReasonSubmitted, setIsReasonSubmitted] = useState<boolean>(false)

  return (
    <CooperationActionBanner
      actionButtons={
        <Button color='tonal-error' onClick={onSend} size='xs'>
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
      isInputShown={isInputShown}
      isReasonSubmitted={isReasonSubmitted}
      onReasonSubmit={onReasonSubmit}
      setIsInputShown={setIsInputShown}
      setIsReasonSubmitted={setIsReasonSubmitted}
      title={t('titles.cooperationClosureDeclined')}
    />
  )
}

export default CooperationClosureDeclinedModal
