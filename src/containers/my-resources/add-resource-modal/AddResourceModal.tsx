import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ResourceService } from '~/services/resource-service'
import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import AddDocuments from '~/containers/add-documents/AddDocuments'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import EnhancedTable, {
  EnhancedTableProps
} from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'
import { ButtonVariantEnum, TableItem } from '~/types'

interface AddResourceModalProps<T>
  extends Omit<EnhancedTableProps<T, undefined>, 'data'> {
  data: { loading: boolean; getItems: (title: string, category: string) => T[] }
  selectedRows: T[]
  onAddItems: () => void
  uploadItem?: (data: FormData) => Promise<void>
  isCategoryFilter?: boolean
  resource: string
}

const AddResourceModal = <T extends TableItem>({
  data,
  selectedRows,
  onAddItems,
  uploadItem,
  isCategoryFilter,
  resource,
  ...props
}: AddResourceModalProps<T>) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const [inputValue, setInputValue] = useState<string>('')
  const [categoryValue, setCategoryValue] = useState<string>('')

  const formData = new FormData()
  const { loading, getItems } = data
  const items = getItems(inputValue, categoryValue)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCategoryChange = (_: SyntheticEvent, value: string | null) => {
    setCategoryValue(value ?? '')
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t(`myResourcesPage.${resource}.add`)}
      </Typography>

      <Box sx={{ display: 'flex', gap: '16px' }}>
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={handleInputChange}
          onClear={handleInputReset}
          placeholder={t('common.search')}
          sx={styles.input}
          value={inputValue}
        />
        {isCategoryFilter && (
          <AsyncAutocomplete
            fetchOnFocus
            freeSolo
            onChange={handleCategoryChange}
            service={ResourceService.getResourcesCategoriesNames}
            sx={styles.input}
            textFieldProps={{
              label: t('myResourcesPage.questions.category')
            }}
            value={categoryValue}
          />
        )}
      </Box>

      <EnhancedTable
        data={{ loading, items }}
        emptyTableKey={`myResourcesPage.${resource}.emptyItems`}
        selectedRows={selectedRows}
        stickyHeader
        style={styles.tableWrapper(!!items.length)}
        sx={styles.table}
        {...props}
      />

      <Box sx={styles.buttonsArea}>
        <Box>
          <AppButton
            disabled={!selectedRows.length}
            onClick={onAddItems}
            sx={styles.addButton}
          >
            {t('common.add')}
          </AppButton>
          <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
            {t('common.cancel')}
          </AppButton>
        </Box>

        {uploadItem && (
          <AddDocuments
            buttonText={t('common.uploadNewFile')}
            fetchData={uploadItem}
            formData={formData}
          />
        )}
      </Box>
    </Box>
  )
}

export default AddResourceModal
