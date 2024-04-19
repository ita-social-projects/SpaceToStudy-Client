import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  category: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.category' }),
  subject: (value: string) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.subject' }),
  info: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.description',
      helperText: textField(20, 1000)(value)
    })
}
