import { ErrorOutlineRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'
import Button from '~/design-system/components/button/Button'

import { styles } from './AcceptCooperationClosing.styles'
import { useState } from 'react'
import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'

interface AcceptCooperationClosureProps {
  user: string
  onAccept: () => void
  onReasonSubmit: (reason: string) => void
}

const AcceptCooperationClosing: React.FC<AcceptCooperationClosureProps> = ({
  user,
  onAccept,
  onReasonSubmit
}) => {
  const { t } = useTranslation()
  const [isInputShown, setIsInputShown] = useState<boolean>(false)
  const [declineReason, setDeclineReason] = useState<string>('')
  const [inputError, setInputError] = useState<boolean>(false)
  const [isReasonSubmitted, setIsReasonSubmitted] = useState<boolean>(false)

  const handleDecline = () => {
    setIsInputShown(true)
  }

  const handleReasonSubmit = () => {
    if (!declineReason.trim()) {
      setInputError(true)
    } else {
      onReasonSubmit(declineReason.trim())
      setDeclineReason('')
      setIsInputShown(false)
      setIsReasonSubmitted(true)
    }
  }

  const handleInputChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDeclineReason(value)
    if (inputError) setInputError(false)
  }

  const isHelperTextShown = inputError
    ? t('cooperationDetailsPage.inputError')
    : ''

  return (
    <CooperationActionBanner
      actionButtons={
        <>
          <Button color='tonal-error' onClick={onAccept} size='xs'>
            {t('cooperationDetailsPage.acceptBtn')}
          </Button>
          <Button onClick={handleDecline} size='xs'>
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
      {isInputShown && !isReasonSubmitted ? (
        <Box sx={styles.inputBox}>
          <Typography sx={styles.textGray}>
            {t('cooperationDetailsPage.InputFieldLabel')}{' '}
          </Typography>
          <Box sx={styles.inputField}>
            <InputField
              error={inputError}
              helperText={isHelperTextShown}
              onChange={handleInputChange}
              onClear={() => setDeclineReason('')}
              placeholder={t('cooperationDetailsPage.inputFieldPlaceholder')}
              sx={styles.input}
              value={declineReason}
              variant={InputFieldVariantEnum.Outlined}
            ></InputField>
            <Button color='tonal-error' onClick={handleReasonSubmit} size='md'>
              {t('cooperationDetailsPage.submitBtn')}
            </Button>
          </Box>
        </Box>
      ) : isReasonSubmitted ? (
        <Typography sx={styles.textGray}>
          {t('cooperationDetailsPage.submitMessage')}
        </Typography>
      ) : null}
    </CooperationActionBanner>
  )
}

export default AcceptCooperationClosing
