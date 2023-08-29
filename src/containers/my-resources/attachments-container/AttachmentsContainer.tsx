import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

<<<<<<< HEAD
=======
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
<<<<<<< HEAD
import useConfirm from '~/hooks/use-confirm'
import AppPagination from '~/components/app-pagination/AppPagination'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import Loader from '~/components/loader/Loader'
import AppPagination from '~/components/app-pagination/AppPagination'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'
import AddDocuments from '~/containers/add-documents/AddDocuments'
import { authRoutes } from '~/router/constants/authRoutes'
import { attachmentService } from '~/services/attachment-service'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

import {
  ItemsWithCount,
  Attachment,
  ErrorResponse,
  ButtonVariantEnum,
  UpdateAttachmentParams,
  ResourcesTabsEnum,
  GetResourcesParams
} from '~/types'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'

const AttachmentsContainer = () => {
  const { setAlert } = useSnackBarContext()
  const breakpoints = useBreakpoints()
  const { page } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchFileName = useRef<string>('')
  const [selectedItemId, setSelectedItemId] = useState<string>('')

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onResponseError = useCallback(
    (error: ErrorResponse, showMessage?: boolean) => {
      const errorMsg = showMessage ? error.message : error.code

      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${errorMsg}` : ''
      })
    },
    [setAlert]
  )

  const onUpdateError = (error: ErrorResponse) => onResponseError(error, true)

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
  const formData = new FormData()

  const deleteAttachment = useCallback(
    (id?: string) => ResourceService.deleteAttachment(id ?? ''),
    [])

  const updateAttachment = useCallback(
    (params?: UpdateAttachmentParams) =>
      ResourceService.updateAttachment(params),
    []

  const { response, loading, fetchData: fetchAttachments } = useAxios<ItemsWithCount<Attachment>>(
    {
      service: getAttachments,
      defaultResponse: defaultResponses.itemsWithCount,
      onResponseError: onAttachmentError
    }

  )

  const { response, loading, fetchData: fetchAttachments } = useAxios<
    ItemsWithCount<Attachment>,
    GetResourcesParams
  >({
    service: getAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onAttachmentUpdate = useCallback(() => void fetchAttachments(), [fetchAttachments])

  const { fetchData: updateData } = useAxios({
    service: updateAttachment,
    defaultResponse: null,
    onResponseError: onUpdateError,
    onResponse: onAttachmentUpdate,
    fetchOnMount: false
  })

  const onSave = async (fileName: string) => {
    const id = selectedItemId
    setSelectedItemId('')
    if (fileName) await updateData({ id, fileName })
  }

  const handleDeleteAttachment = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await fetchDeleteAttachment(id)
      if (!error) await fetchAttachments()
    }
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = ajustColumns(
    breakpoints,
    columns(selectedItemId, onCancel, onSave),
    removeColumnRules
  )

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeleteAttachment(id, isConfirmed),
      title: 'myResourcesPage.attachments.confirmAttachmentDeletionTitle'
    })
  }

  const rowActions = [
    {
      label: t('common.edit'),
      func: () => console.log(t('common.edit'))
    },
    {
      label: t('common.delete'),
      func: openDeletionConfirmDialog
    }
  ]

  const createAttachments = useCallback(
    (data?: FormData) => attachmentService.createAttachments(data),
    []
  )

  const onCreateAttachmentsError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const { fetchData: fetchCreateAttachment } = useAxios({
    service: createAttachments,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onCreateAttachmentsError
  })

  const uploadFile = async (data: FormData) => {
    await fetchCreateAttachment(data)
    await fetchAttachments()
  }

  const addAttachmentBlock = (
    <AddResourceWithInput
      fetchData={fetchAttachments}
      searchRef={searchFileName}
      button={
        <AddDocuments
          buttonText={t('myResourcesPage.attachments.addAttachment')}
          fetchData={uploadFile}
          formData={formData}
          icon={<AddIcon sx={styles.addAttachmentIcon} />}
          sx={styles.addAttachmentBtn}
          variant={ButtonVariantEnum.Contained}
        />
      }
      />
  )

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchAttachments },
    services: { deleteService: deleteAttachment },
    itemsPerPage,
    actions: { onEdit },
    resource: ResourcesTabsEnum.Attachments,
    sort: sortOptions,
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.attachments.addBtn'}
        fetchData={fetchAttachments}
        link={'#'}
        searchRef={searchFileName}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Attachment> {...props} />
      )}
    </Box>
  )
}

export default AttachmentsContainer
