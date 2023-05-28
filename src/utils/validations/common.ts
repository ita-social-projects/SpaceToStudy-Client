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
    if (!RegExp(/^[a-zа-яєії ]+$/i).test(value)) {
      return 'common.errorMessages.nameAlphabeticOnly'
    }
    return ''
  },
  numberField: (value) => {
    if (!RegExp(/^-?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/).test(value)) {
      return 'common.errorMessages.numbersOnly'
    }
    if (Number(value) < 0) {
      return 'common.errorMessages.positiveNumbersOnly'
    }
    return ''
  },
  password: (value) => {
    if (!RegExp(/^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i).test(value)) {
      return 'common.errorMessages.passwordValid'
    }
    if (value.length < 8 || value.length > 25) {
      return 'common.errorMessages.passwordLength'
    }
    return ''
  },
  email: (value) => {
    if (
      !RegExp(
        /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i
      ).test(value)
    ) {
      return 'common.errorMessages.emailValid'
    }
    return ''
  }
}

export const emptyField = (
  value: string | null,
  emtyMessage = 'common.errorMessages.emptyField',
  helperText?: string
) => {
  if (!value) {
    return emtyMessage
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

export const helperTextHandler = (
  value: string,
  marker: keyof Validations,
  emptyMessage?: string
) => {
  return emptyField(value, emptyMessage, validations[marker](value))
}
