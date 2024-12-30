import { useCallback, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import InputField from '~/design-system/components/input-field/InputField'
import { InputFieldVariantEnum } from '~/design-system/components/input-field/InputField.constants'
import useForm from '~/hooks/use-form'
import { emptyField } from '~/utils/validations/common'
import Button from '~/design-system/components/button/Button'

import { styles } from './CooperationActionInput.styles'

type CooperationActionInputProps = {
  inputLabel: string
  inputPlaceholderMessage: string
  isInputShown: boolean
  isReasonSubmitted: boolean
  onReasonSubmit: (reason: string) => void
  setIsInputShown: (value: boolean) => void
}

const CooperationActionInput: React.FC<CooperationActionInputProps> = ({
  inputLabel,
  inputPlaceholderMessage,
  isReasonSubmitted,
  isInputShown,
  onReasonSubmit,
  setIsInputShown
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
      },
      submitWithData: true
    })

  const hasErrors = Boolean(errors.declineReason)

  const handleReasonSubmit = useCallback(() => {
    const isValid = trigger('declineReason')

    if (isValid && !hasErrors) {
      handleSubmit()
      setIsInputShown(false)
    }
  }, [handleSubmit, setIsInputShown, hasErrors, trigger])

  if (isInputShown) {
    return (
      <Box sx={styles.inputBox}>
        <Typography sx={styles.textGray}>{inputLabel}</Typography>
        <Box sx={styles.inputContainer}>
          <InputField
            error={hasErrors}
            helperText={errors.declineReason}
            onChange={handleInputChange('declineReason')}
            onClear={() => resetData(['declineReason'])}
            placeholder={inputPlaceholderMessage}
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
}

export default CooperationActionInput
