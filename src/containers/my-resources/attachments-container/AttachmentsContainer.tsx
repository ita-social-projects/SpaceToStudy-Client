import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import { ResourceService } from '~/services/resource-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'

import {
  columns,
  removeColumnRules,
  initialSort,
  itemsLoadLimit
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ItemsWithCount, Attachment, ErrorResponse } from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const sortOptions = useSort({ initialSort })
  const { sort, onRequestSort } = sortOptions

  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onAttachmentError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getAttachments = useCallback(
    () => ResourceService.getAttachments({ limit: itemsPerPage }),
    [itemsPerPage]
  )

  const { response, loading } = useAxios<ItemsWithCount<Attachment>>({
    service: getAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError: onAttachmentError
  })

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const rowActions = [
    {
      label: t('common.edit'),
      func: () => console.log(t('common.edit'))
    },
    {
      label: t('common.delete'),
      func: () => console.log(t('common.delete'))
    }
  ]

  const addAttachmentBlock = (
    <Box sx={styles.container}>
      <AppButton disabled sx={styles.addButton}>
        {t('myResourcesPage.attachments.addAttachment')}
        <span style={styles.newAttachmentIcon}>{t('common.plusSign')}</span>
      </AppButton>
      <InputWithIcon
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={() => null}
        onClear={() => null}
        placeholder={t('common.search')}
        sx={styles.input}
      ></InputWithIcon>
    </Box>
  )
  const tableAttachments = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items: response.items }}
      emptyTableKey='myResourcesPage.emptyAttachments'
      rowActions={rowActions}
      sort={{
        sort,
        onRequestSort
      }}
      sx={styles.table}
    />
  )

  return (
    <Box>
      {addAttachmentBlock}
      {loading ? <Loader pageLoad size={50} /> : tableAttachments}
    </Box>
  )
}
export default AttachmentsContainer
