import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import { attachmentService } from '~/services/attachment-service'

import { ajustColumns } from '~/utils/helper-functions'
import {
  initialSort,
  columns,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'
import { defaultResponses } from '~/constants'
import { styles } from '~/containers/add-attachments/AddAttachments.styles'
import { Attachment, ButtonVariantEnum } from '~/types'

const AddAttachments: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const breakpoints = useBreakpoints()
  const sortOptions = useSort({
    initialSort
  })
  const { sort } = sortOptions

  const columnsToShow = ajustColumns<Attachment>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyAttachments = useCallback(
    () =>
      attachmentService.getAttachments({
        sort
      }),
    [sort]
  )

  const { loading, response } = useAxios({
    service: getMyAttachments,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleInputReset = () => {
    setInputValue('')
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('myResourcesPage.attachments.addFromAttachments')}
      </Typography>
      <InputWithIcon
        disabled
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={handleInputChange}
        onClear={handleInputReset}
        placeholder={t('common.search')}
        sx={styles.input}
        value={inputValue}
      />
      <Box sx={styles.tableWrapper}>
        <EnhancedTable
          columns={columnsToShow}
          data={{ loading, items: response.items }}
          emptyTableKey='myResourcesPage.attachments.emptyAttachments'
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

        <AppButton disabled>
          {t('myResourcesPage.attachments.uploadNewFile')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default AddAttachments
