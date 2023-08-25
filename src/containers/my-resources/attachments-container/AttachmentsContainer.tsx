import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import useConfirm from '~/hooks/use-confirm'
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
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  ItemsWithCount,
  Attachment,
  ErrorResponse,
  UpdateAttachmentParams
} from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useConfirm()
  const { page, handleChangePage } = usePagination()
  const breakpoints = useBreakpoints()
  const sortOptions = useSort({ initialSort })
  const [selectedItemId, setSelectedItemId] = useState<string>('')

  const { sort } = sortOptions
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

  const onDeleteAttachmentError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onDeleteAttachmentResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'myResourcesPage.attachments.successDeletion'
    })
  }

  const deleteAttachment = useCallback(
    (id?: string) => ResourceService.deleteAttachment(id ?? ''),
    []
  )

  const updateAttachment = useCallback(
    (params?: UpdateAttachmentParams) =>
      ResourceService.updateAttachment(params),
    []
  )

  const {
    response,
    loading,
    fetchData,
    fetchData: fetchGetAttachments
  } = useAxios<ItemsWithCount<Attachment>>({
    service: getAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError: onAttachmentError
  })

  const onAttachmentUpdate = useCallback(() => void fetchData(), [fetchData])

  const { fetchData: updateData } = useAxios({
    service: updateAttachment,
    defaultResponse: null,
    onResponseError: onAttachmentError,
    onResponse: onAttachmentUpdate,
    fetchOnMount: false
  })

  const onSave = async (fileName: string) => {
    if (fileName) await updateData({ id: selectedItemId, fileName })
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const { error, fetchData: fetchDeleteAttachment } = useAxios({
    service: deleteAttachment,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onDeleteAttachmentError,
    onResponse: onDeleteAttachmentResponse
  })

  const handleDeleteAttachment = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await fetchDeleteAttachment(id)
      if (!error) await fetchGetAttachments()
    }
  }

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeleteAttachment(id, isConfirmed),
      title: 'myResourcesPage.attachments.confirmAttachmentDeletionTitle'
    })
  }

  const columnsToShow = ajustColumns(
    breakpoints,
    columns(selectedItemId, onCancel, onSave),
    removeColumnRules
  )

  const rowActions = [
    {
      label: t('common.rename'),
      func: onEdit
    },
    {
      label: t('common.delete'),
      func: openDeletionConfirmDialog
    }
  ]

  const addAttachmentBlock = (
    <AddResourceWithInput
      btnText='myResourcesPage.attachments.addAttachment'
      fetchData={fetchGetAttachments}
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
