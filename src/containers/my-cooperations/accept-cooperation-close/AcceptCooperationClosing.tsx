import { ErrorOutlineRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'
import Button from '~/design-system/components/button/Button'

import { styles } from './AcceptCooperationClosing.styles'
import { useState } from 'react'
import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'
import useForm from '~/hooks/use-form'

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
  const [isReasonSubmitted, setIsReasonSubmitted] = useState<boolean>(false)

  const handleDecline = () => {
    setIsInputShown(true)
  }

  const {
    data,
    errors,
    trigger,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm({
    initialValues: { declineReason: '' },
    validations: {
      declineReason: (value) =>
        value ? '' : t('cooperationDetailsPage.inputError')
    },
    onSubmit: (formData) => {
      if (formData) {
        onReasonSubmit(formData.declineReason)
      }
    }
  })

  const handleReasonSubmit = () => {
    const isValid = trigger('declineReason')

    if (isValid && !errors.declineReason) {
      handleSubmit()
      setIsReasonSubmitted(true)
      setIsInputShown(false)
    }
  }

  const isSubmitMessageShown =
    isReasonSubmitted && !errors.declineReason ? (
      <Typography sx={styles.textGray}>
        {t('cooperationDetailsPage.submitMessage')}
      </Typography>
    ) : null

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
      {isInputShown ? (
        <Box sx={styles.inputBox}>
          <Typography sx={styles.textGray}>
            {t('cooperationDetailsPage.InputFieldLabel')}{' '}
          </Typography>
          <Box sx={styles.inputField}>
            <InputField
              error={!!errors.declineReason}
              helperText={errors.declineReason}
              onChange={handleInputChange('declineReason')}
              onClear={() => handleNonInputValueChange('declineReason', '')}
              placeholder={t('cooperationDetailsPage.inputFieldPlaceholder')}
              sx={styles.input}
              value={data.declineReason}
              variant={InputFieldVariantEnum.Outlined}
            ></InputField>
            <Button color='tonal-error' onClick={handleReasonSubmit} size='md'>
              {t('cooperationDetailsPage.submitBtn')}
            </Button>
          </Box>
        </Box>
      ) : (
        isSubmitMessageShown
      )}
    </CooperationActionBanner>
  )
}

export default AcceptCooperationClosing
