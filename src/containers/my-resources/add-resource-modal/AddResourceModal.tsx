import { ChangeEvent, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import EnhancedTable, {
  EnhancedTableProps
} from '~/components/enhanced-table/EnhancedTable'
import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButtonMenu from '~/components/app-button-menu/AppButtonMenu'
import CheckboxWithTooltip from '~/components/checkbox-with-tooltip/CheckboxWithTooltip'

import AddDocuments from '~/containers/add-documents/AddDocuments'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'
import { ResourceService } from '~/services/resource-service'
import { useModalContext } from '~/context/modal-context'
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
  initialSelectedRows: T[]
  onAddItems: () => void
  onCreateResourceCopy?: (value: boolean) => void
  uploadItem?: (data: FormData) => Promise<void>
  resourceTab: ResourcesTabsEnum
  showCheckboxWithTooltip?: boolean
}

const AddResourceModal = <T extends TableItem>({
  data,
  selectedRows,
  initialSelectedRows,
  onAddItems,
  onCreateResourceCopy,
  uploadItem,
  resourceTab,
  showCheckboxWithTooltip = false,
  ...props
}: AddResourceModalProps<T>) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const formData = new FormData()
  const { loading, getItems } = data

  const items = useMemo(
    () => getItems(inputValue, selectedItems),
    [inputValue, selectedItems, getItems]
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleInputReset = useCallback(() => {
    setInputValue('')
  }, [])

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
        disableInitialSelectedRows
        emptyTableKey={`myResourcesPage.${resourceTab}.emptyItems`}
        initialSelectedRows={initialSelectedRows}
        selectedRows={selectedRows}
        stickyHeader
        style={styles.tableWrapper(!!items.length)}
        sx={styles.table}
        {...props}
      />

      <Box sx={showCheckboxWithTooltip ? styles.formControls : {}}>
        {showCheckboxWithTooltip && (
          <CheckboxWithTooltip
            label={t('myResourcesPage.resourceDuplication.description', {
              resource: t(
                `myResourcesPage.resourceDuplication.resource.${resourceTab}`
              )
            })}
            onChecked={onCreateResourceCopy}
            tooltipTitle={t('myResourcesPage.resourceDuplication.tooltip')}
          />
        )}
        <Box sx={styles.buttonsArea}>
          <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
            {t('common.cancel')}
          </AppButton>
          <AppButton
            disabled={
              !selectedRows.length ||
              initialSelectedRows.length === selectedRows.length
            }
            onClick={onAddItems}
            sx={styles.addButton}
          >
            {t('common.add')}
          </AppButton>
        </Box>
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
