import { type ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'
import useForm from '~/hooks/use-form'
import { emptyField } from '~/utils/validations/common'
import Button from '~/design-system/components/button/Button'

import { styles } from './CooperationActionBanner.styles'

type Properties = {
  actionButtons?: ReactNode
  description: ReactNode
  icon?: ReactNode
  isInputShown: boolean
  isReasonSubmitted: boolean
  onReasonSubmit: (reason: string) => void
  setIsInputShown: (value: boolean) => void
  setIsReasonSubmitted: (value: boolean) => void
  title: string
}

const CooperationActionBanner: React.FC<Properties> = ({
  actionButtons,
  description,
  icon,
  isInputShown,
  isReasonSubmitted,
  onReasonSubmit,
  setIsInputShown,
  setIsReasonSubmitted,
  title
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isInputShown && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isInputShown])

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
    <Box sx={styles.container}>
      <Box sx={styles.mainContentWrapper}>
        <Box>
          <Box sx={styles.header}>
            {icon}
            <Typography>{title}</Typography>
          </Box>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
        {actionButtons && <Box sx={styles.buttonsWrapper}>{actionButtons}</Box>}
      </Box>
      {renderedInputField}
    </Box>
  )
}

export default CooperationActionBanner
