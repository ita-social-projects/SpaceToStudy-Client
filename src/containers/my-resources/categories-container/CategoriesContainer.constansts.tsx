import Typography from '@mui/material/Typography'

import RenameInput from '~/containers/my-resources/rename-input/RenameInput'

import { getFormattedDate } from '~/utils/helper-functions'
import { Categories, TableColumn, SortEnum, RemoveColumnRules } from '~/types'
import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'
import { emptyField, textField } from '~/utils/validations/common'

export const validation = (disallowedValues: string[]) => (value: string) => {
  const trimmedValue = value.trim()
  return Boolean(
    emptyField({ value, helperText: textField(2, 35)(trimmedValue) }) ||
      disallowedValues.includes(trimmedValue)
  )
}

export const columns = (
  selectedItemId: string,
  onSave: (name: string) => Promise<void>,
  onCancel: () => void,
  validation: (value: string) => boolean
): TableColumn<Categories>[] => [
  {
    label: 'myResourcesPage.categories.title',
    field: 'title',
    calculatedCellValue: (item: Categories) =>
      selectedItemId === item._id ? (
        <RenameInput
          initValue={item.name}
          onCancel={onCancel}
          onSave={onSave}
          validation={validation}
        />
      ) : (
        <Typography sx={styles.title}>{item.name}</Typography>
      )
  },
  {
    label: 'myResourcesPage.categories.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Categories) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Categories> = {
  mobile: ['myResourcesPage.categories.updated']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  mobile: 6,
  tablet: 8
}
