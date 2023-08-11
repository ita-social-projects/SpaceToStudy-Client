import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

import { useModalContext } from '~/context/modal-context'
import { ajustColumns } from '~/utils/helper-functions'
import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'

import { styles } from '~/containers/add-attachments/AddAttachments.styles'
import {
  mockItems,
  initialSort,
  columns,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import { Attachment, ButtonVariantEnum } from '~/types'

const AddAttachments: FC = () => {
  const [inputValue, setInputValue] = useState('')

  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const breakpoints = useBreakpoints()
  const sortOptions = useSort({
    initialSort
  })

  const columnsToShow = ajustColumns<Attachment>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleInputReset = () => {
    setInputValue('')
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('attachment.addFromAttachments')}
      </Typography>
      <InputWithIcon
        disabled
        onChange={handleInputChange}
        onClear={handleInputReset}
        placeholder={t('common.search')}
        startIcon={<SearchIcon sx={styles.searchIcon} />}
        sx={styles.input}
        value={inputValue}
      />
      <Box sx={styles.tableWrapper}>
        <EnhancedTable
          columns={columnsToShow}
          data={{ items: mockItems }}
          sort={sortOptions}
          sx={styles.table}
        />
      </Box>

      <Box sx={styles.buttonsArea}>
        <Box>
          <AppButton disabled sx={styles.addButton}>
            {t('common.add')}
          </AppButton>
          <AppButton onClick={closeModal} variant={ButtonVariantEnum.Outlined}>
            {t('common.cancel')}
          </AppButton>
        </Box>

        <AppButton disabled>{t('attachment.uploadNewFile')}</AppButton>
      </Box>
    </Box>
  )
}

export default AddAttachments
