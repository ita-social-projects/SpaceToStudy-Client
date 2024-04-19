import { emptyField, textField } from '~/utils/validations/common'

export const initialValues = {
  name: ''
}

const valueNotIn = (value: string, disallowedValues: string[]) =>
  disallowedValues.includes(value)
    ? 'myResourcesPage.categories.categoryAlreadyExistsError'
    : undefined

export const validations = (disallowedValues: string[]) => ({
  name: (value: string) => {
    const trimmedValue = value.trim()
    return (
      emptyField({ value, helperText: textField(2, 35)(trimmedValue) }) ||
      valueNotIn(trimmedValue, disallowedValues)
    )
  }
})
