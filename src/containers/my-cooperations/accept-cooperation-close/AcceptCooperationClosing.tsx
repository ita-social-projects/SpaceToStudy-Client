import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ErrorOutlineRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'
import Button from '~/design-system/components/button/Button'

import { styles } from './AcceptCooperationClosing.styles'
import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'
import useForm from '~/hooks/use-form'
import { emptyField } from '~/utils/validations/common'

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

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isInputShown && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isInputShown])

  const handleDeclineClick = () => {
    setIsInputShown(true)
  }

  const { data, errors, trigger, handleInputChange, handleSubmit, resetData } =
    useForm({
      initialValues: { declineReason: '' },
      validations: {
        declineReason: (value) => {
          return emptyField({
            value,
            emptyMessage: t('cooperationDetailsPage.inputError')
          })
        }
      },
      onSubmit: (data) => {
        if (data) {
          onReasonSubmit(data.declineReason)
        }
      }
    })

  const hasErrors = Boolean(errors.declineReason)

  const handleReasonSubmit = useCallback(() => {
    const isValid = trigger('declineReason')

    if (isValid && !hasErrors) {
      handleSubmit()
      setIsReasonSubmitted(true)
      setIsInputShown(false)
    }
  }, [handleSubmit, setIsInputShown, setIsReasonSubmitted, hasErrors, trigger])

  const renderedInputField = useMemo(() => {
    if (isInputShown) {
      return (
        <Box sx={styles.inputBox}>
          <Typography sx={styles.textGray}>
            {t('cooperationDetailsPage.InputFieldLabel')}
          </Typography>
          <Box sx={styles.inputContainer}>
            <InputField
              error={hasErrors}
              helperText={errors.declineReason}
              onChange={handleInputChange('declineReason')}
              onClear={() => resetData(['declineReason'])}
              placeholder={t('cooperationDetailsPage.inputFieldPlaceholder')}
              ref={inputRef}
              sx={styles.inputField}
              value={data.declineReason}
              variant={InputFieldVariantEnum.Outlined}
            ></InputField>
            <Button color='tonal-error' onClick={handleReasonSubmit} size='sm'>
              {t('cooperationDetailsPage.submitBtn')}
            </Button>
          </Box>
        </Box>
      )
    }

    return (
      isReasonSubmitted &&
      !hasErrors && (
        <Typography sx={styles.textGray}>
          {t('cooperationDetailsPage.submitMessage')}
        </Typography>
      )
    )
  }, [
    isInputShown,
    isReasonSubmitted,
    data.declineReason,
    errors.declineReason,
    hasErrors,
    resetData,
    handleInputChange,
    handleReasonSubmit,
    t
  ])

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
      {renderedInputField}
    </CooperationActionBanner>
  )
}

export default AcceptCooperationClosing
