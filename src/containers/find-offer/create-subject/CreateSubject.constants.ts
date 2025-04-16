import { emptyField } from '~/utils/validations/common'

export const validations = {
  category: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.category' }),
  name: (value: string) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.subject' })
}
