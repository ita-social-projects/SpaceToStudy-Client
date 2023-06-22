import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  info: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(20, 1000)(value)
    )
}
