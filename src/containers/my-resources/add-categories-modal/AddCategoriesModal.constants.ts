import { emptyField, textField } from '~/utils/validations/common'

export const initialValues = {
  name: ''
}

export const validations = {
  name: (value: string) =>
    emptyField(
      value,
      'common.errorMessages.emptyField',
      textField(2, 35)(value)
    )
}
