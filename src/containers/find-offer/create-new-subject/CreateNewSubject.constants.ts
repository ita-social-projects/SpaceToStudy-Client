import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'common.errorMessages.category'),
  subject: (value: string) => emptyField(value, 'common.errorMessages.subject'),
  info: (value: string) =>
    emptyField(
      value,
      'common.errorMessages.description',
      textField(20, 1000)(value)
    )
}
