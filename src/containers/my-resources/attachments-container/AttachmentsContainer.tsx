import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import useAxios from '~/hooks/use-axios'

import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'
import AppPagination from '~/components/app-pagination/AppPagination'
import usePagination from '~/hooks/table/use-pagination'
import { useDebounce } from '~/hooks/use-debounce'
import { ResourceService } from '~/services/resource-service'

import { defaultResponses } from '~/constants'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import { Attachment, GetLessonsParams, ItemsWithCount } from '~/types'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ajustColumns } from '~/utils/helper-functions'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { page, handleChangePage } = usePagination()

  const sortOptions = useSort({ initialSort: initialSort })
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
  return (
    <Box>
      {addAttachmentBlock}
      {loading ? <Loader pageLoad size={50} /> : tableAttachments}
    </Box>
  )
}

export default AttachmentsContainer
