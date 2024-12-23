import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'
import useForm from '~/hooks/use-form'
import { emptyField } from '~/utils/validations/common'
import Button from '~/design-system/components/button/Button'

import { styles } from './CooperationActionInput.styles'

type CooperationActionInputProps = {
  isInputShown: boolean
  isReasonSubmitted?: boolean
  onReasonSubmit: (reason: string) => void
  setIsInputShown: (value: boolean) => void
  setIsReasonSubmitted?: (value: boolean) => void
}

const CooperationActionInput: React.FC<CooperationActionInputProps> = ({
  isInputShown,
  isReasonSubmitted: customIsReasonSubmitted,
  onReasonSubmit,
  setIsInputShown,
  setIsReasonSubmitted: customSetIsReasonSubmitted
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [internalIsReasonSubmitted, setInternalIsReasonSubmitted] =
    useState<boolean>(false)

  const isReasonSubmitted = customIsReasonSubmitted ?? internalIsReasonSubmitted
  const setIsReasonSubmitted =
    customSetIsReasonSubmitted ?? setInternalIsReasonSubmitted

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
      setIsReasonSubmitted && setIsReasonSubmitted(true)
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

  return <>{renderedInputField}</>
}

export default CooperationActionInput
