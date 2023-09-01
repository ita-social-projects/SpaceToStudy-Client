import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import AppPagination from '~/components/app-pagination/AppPagination'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import { authRoutes } from '~/router/constants/authRoutes'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { ItemsWithCount, Attachment, ErrorResponse } from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { page, handleChangePage } = usePagination()

  const sortOptions = useSort({ initialSort })
  const { sort } = sortOptions

  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

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

  const { response, loading, fetchData } = useAxios<ItemsWithCount<Attachment>>(
    {
      service: getAttachments,
      defaultResponse: defaultResponses.itemsWithCount,
      onResponseError: onAttachmentError
    }
  )
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
    <AddResourceWithInput
      btnText='myResourcesPage.attachments.addAttachment'
      fetchData={fetchData}
      link={authRoutes.myResources.root.path}
      searchRef={searchFileName}
    />
  )

  const tableAttachments = (
    <>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: response.items }}
        emptyTableKey='myResourcesPage.attachments.emptyAttachments'
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
