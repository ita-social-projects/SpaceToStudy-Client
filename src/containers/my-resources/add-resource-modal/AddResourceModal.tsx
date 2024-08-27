import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ResourceService } from '~/services/resource-service'
import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import AddDocuments from '~/containers/add-documents/AddDocuments'
import EnhancedTable, {
  EnhancedTableProps
} from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButtonMenu from '~/components/app-button-menu/AppButtonMenu'

import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'
import {
  ButtonVariantEnum,
  CategoryNameInterface,
  ResourcesTabsEnum,
  TableItem
} from '~/types'

interface AddResourceModalProps<T>
  extends Omit<EnhancedTableProps<T, undefined>, 'data'> {
  data: {
    loading: boolean
    getItems: (title: string, selectedItems: string[]) => T[]
  }
  selectedRows: T[]
  onAddItems: () => void
  uploadItem?: (data: FormData) => Promise<void>
  resourceTab: ResourcesTabsEnum
}

const AddResourceModal = <T extends TableItem>({
  data,
  selectedRows,
  onAddItems,
  uploadItem,
  resourceTab,
  ...props
}: AddResourceModalProps<T>) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const formData = new FormData()
  const { loading, getItems } = data
  const items = getItems(inputValue, selectedItems)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t(`myResourcesPage.${resourceTab}.add`)}
      </Typography>

      <Box sx={styles.inputWithFilter}>
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={handleInputChange}
          onClear={handleInputReset}
          placeholder={t('common.search')}
          sx={styles.titleInput}
          value={inputValue}
        />
        <AppButtonMenu<CategoryNameInterface>
          selectedItems={selectedItems}
          service={ResourceService.getResourcesCategoriesNames}
          setSelectedItems={setSelectedItems}
          showNoneProperty
          title={t('myResourcesPage.categories.category')}
          valueField='name'
        />
      </Box>

      <EnhancedTable
        data={{ loading, items }}
        emptyTableKey={`myResourcesPage.${resourceTab}.emptyItems`}
        selectedRows={selectedRows}
        stickyHeader
        style={styles.tableWrapper(!!items.length)}
        sx={styles.table}
        {...props}
      />

      <Box sx={styles.buttonsArea}>
        <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton
          disabled={!selectedRows.length}
          onClick={onAddItems}
          sx={styles.addButton}
        >
          {t('common.add')}
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
  )
}

export default AddResourceModal
