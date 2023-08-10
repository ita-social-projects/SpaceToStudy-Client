import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import { ajustColumns } from '~/utils/helper-functions'
import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'

import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

import { styles } from '~/containers/add-attachments/AddAttachments.styles'
import {
  initialSort,
  columns,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import { Attachment } from '~/types'

const mockItems = [
  {
    _id: '64d27b1a9b560f984ff73ad0',
    author: '64c0b13ad488960d0caa3883',
    fileName: 'document.doc',
    size: 133302,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '64d27b1a9b560f914ff73ad0',
    author: '64c0b13ad488960d0caa3883',
    fileName:
      'Additional Materials - Advanced Quantum mechanics and other cool learning materials.docx',
    size: 13023302,
    createdAt: new Date('2022-10-2').toISOString(),
    updatedAt: new Date('2023-1-1').toISOString()
  }
]

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
      <Typography sx={styles.title} variant='h2'>
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
          <AppButton disabled sx={styles.addBtn}>
            {t('common.add')}
          </AppButton>
          <AppButton onClick={closeModal} variant='outlined'>
            {t('common.cancel')}
          </AppButton>
        </Box>

        <AppButton disabled>{t('attachment.uploadNewFile')}</AppButton>
      </Box>
    </Box>
  )
}

export default AddAttachments
