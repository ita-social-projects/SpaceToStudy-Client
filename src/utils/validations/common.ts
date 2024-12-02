import { validationPatterns } from '~/utils/validations/validations.constants'

interface Validations {
  nameField: (value: string) => string
  numberField: (value: string) => string
  password: (value: string) => string
  email: (value: string) => string
}

const validations: Validations = {
  nameField: (value) => {
    if (value.length > 30) {
      return 'common.errorMessages.nameLength'
    }
    if (!validationPatterns.name.test(value)) {
      return 'common.errorMessages.nameCharacters'
    }
    return ''
  },
  numberField: (value) => {
    if (!validationPatterns.number.test(value)) {
      return 'common.errorMessages.numbersOnly'
    }
    if (Number(value) < 0) {
      return 'common.errorMessages.positiveNumbersOnly'
    }
    return ''
  },
  password: (value) => {
    if (!validationPatterns.passwordAlphabeticAndNumeric.test(value)) {
      return 'common.errorMessages.passwordAlphabeticAndNumeric'
    }
    if (!validationPatterns.passwordValid.test(value)) {
      return 'common.errorMessages.passwordValidSymbols'
    }
    if (value.length < 8 || value.length > 25) {
      return 'common.errorMessages.passwordLength'
    }
    return ''
  },
  email: (value) => {
    if (!validationPatterns.email.test(value)) {
      return 'common.errorMessages.emailValid'
    }
    return ''
  }
}

interface EmptyFieldParams {
  value: string | null
  emptyMessage?: string
  helperText?: string
}

export const emptyField = ({
  emptyMessage = 'common.errorMessages.emptyField',
  value,
  helperText
}: EmptyFieldParams) => {
  if (!value) {
    return emptyMessage
  }
  if (!value.trim()) {
    return 'common.errorMessages.hasOnlySpaces'
  }
  return helperText
}

export const nameField = (value: string) => {
  return helperTextHandler(value, 'nameField')
}

export const numberField = (value: string, errorMessage: string) => {
  return helperTextHandler(value, 'numberField', errorMessage)
}

export const textField =
  (min: number, max: number) =>
  (value: string): string | undefined => {
    if (value.length !== 0 && value.length < min) {
      return 'common.errorMessages.shortText'
    }
    if (value.length > max) {
      return 'common.errorMessages.longText'
    }
  }

export const youtubeVideoLink = (value: string): string => {
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be|youtube\.com)/

  if (value && !youtubeRegex.test(value)) {
    return 'common.errorMessages.youtubeLink'
  }
  return ''
}

export const helperTextHandler = (
  value: string,
  marker: keyof Validations,
  emptyMessage?: string
) => {
  return emptyField({
    value,
    emptyMessage,
    helperText: validations[marker](value)
  })
}
