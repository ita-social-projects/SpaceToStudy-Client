import { useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { Trans, useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import Button from '~/design-system/components/button/Button'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'

import { styles } from './CooperationClosureDeclinedBanner.styles'
import CooperationActionInput from '../cooperation-action-input/CooperationActionInput'

export interface CooperationClosureDeclinedBannerProps {
  isAnswerSubmitted: boolean
  message?: string
  onSend: (answer: string) => void
  user: string
  submittedReason?: string
}

const CooperationClosureDeclinedBanner: React.FC<
  CooperationClosureDeclinedBannerProps
> = ({ isAnswerSubmitted, message, onSend, user, submittedReason }) => {
  const { t } = useTranslation()
  const [isInputShown, setIsInputShown] = useState<boolean>(false)

  const handleResendRequest = () => {
    setIsInputShown(true)
  }

  return (
    <CooperationActionBanner
      actionButtons={
        <Button
          disabled={isAnswerSubmitted}
          onClick={handleResendRequest}
          size='xs'
          variant='tonal-error'
        >
          {t('cooperationDetailsPage.resendRequestBtn')}
        </Button>
      }
      description={
        <>
          <Trans
            components={{
              userWrapper: <Typography component='span' sx={styles.boldText} />
            }}
            i18nKey='cooperationDetailsPage.cooperationCloseDeclinedMessage'
            values={{ user: user }}
          />
          <Typography>{message}</Typography>
        </>
      }
      icon={<ErrorOutlineRounded />}
      title={t('titles.cooperationClosureDeclined')}
    >
      <CooperationActionInput
        inputLabel={t('cooperationDetailsPage.responseInputFieldLabel')}
        inputPlaceholderMessage={t(
          t('cooperationDetailsPage.responseInputFieldPlaceholder')
        )}
        isInputShown={isInputShown}
        isReasonSubmitted={isAnswerSubmitted}
        onReasonSubmit={onSend}
        setIsInputShown={setIsInputShown}
        submittedReason={submittedReason}
      />
    </CooperationActionBanner>
  )
}

export default CooperationClosureDeclinedBanner
