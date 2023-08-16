import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppPagination from '~/components/app-pagination/AppPagination'
import usePagination from '~/hooks/table/use-pagination'
import { useDebounce } from '~/hooks/use-debounce'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import { useSnackBarContext } from '~/context/snackbar-context'
import { Attachment, ErrorResponse, ItemsWithCount } from '~/types'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { page, handleChangePage } = usePagination()

  const sortOptions = useSort({ initialSort })
  const { sort } = sortOptions

  const [searchInput, setSearchInput] = useState<string>('')
  const searchFileName = useRef<string>('')

  const getAttachments = useCallback(
    () =>
      ResourceService.getAttachments({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        fileName: searchFileName.current
      }),
    [itemsPerPage, page, sort, searchFileName]
  )

  const onAttachmentError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const { response, loading, fetchData } = useAxios<ItemsWithCount<Attachment>>({
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

  const debouncedOnSearch = useDebounce((text: string) => {
    searchFileName.current = text
    void fetchData()
  })

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedOnSearch(e.target.value)
  }

  const onSearchClear = () => {
    setSearchInput('')
    searchFileName.current = ''
    void fetchData()
  }

  const addAttachmentBlock = (
    <Box sx={styles.container}>
      <AppButton disabled sx={styles.addButton}>
        {t('myResourcesPage.attachments.addAttachment')}
        <span style={styles.newAttachmentIcon}>{t('common.plusSign')}</span>
      </AppButton>
      <InputWithIcon
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={onSearchChange}
        onClear={onSearchClear}
        placeholder={t('common.search')}
        sx={styles.input}
        value={searchInput}
      />
    </Box>
  )

  const tableAttachments = (
    <>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: response.items }}
        emptyTableKey='myResourcesPage.emptyAttachments'
        rowActions={rowActions}
        sort={sortOptions}
        sx={styles.table}
      />
      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={Math.ceil(response.count / itemsPerPage)}
      />
    </>
  )

  return (
    <Box>
      {addAttachmentBlock}
      {loading ? <Loader pageLoad size={50} /> : tableAttachments}
    </Box>
  )
}

export default AttachmentsContainer
