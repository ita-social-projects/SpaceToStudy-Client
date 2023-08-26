import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'

import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'
import AddDocuments from '~/containers/add-documents/AddDocuments'

import { defaultResponses, snackbarVariants } from '~/constants'

import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import {
  ItemsWithCount,
  GetResourcesParams,
  Attachment,
  ErrorResponse,
  UpdateAttachmentParams,
  ResourcesTabsEnum,
  ButtonVariantEnum
} from '~/types'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchFileName = useRef<string>('')
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const formData = new FormData()

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
    fetchData: fetchAttachments
  } = useAxios<ItemsWithCount<Attachment>, GetResourcesParams>({
    service: getAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onAttachmentUpdate = useCallback(
    () => void fetchAttachments(),
    [fetchAttachments]
  )

  const { fetchData: updateData } = useAxios({
    service: updateAttachment,
    defaultResponse: null,
    onResponseError: onUpdateError,
    onResponse: onAttachmentUpdate,
    fetchOnMount: false
  })

  const createAttachments = useCallback(
    (data?: FormData) => ResourceService.createAttachments(data),
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

  const onSave = async (fileName: string) => {
    const id = selectedItemId
    setSelectedItemId('')
    if (fileName) await updateData({ id, fileName })
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
  const addAttachmentBlock = (
    <AddResourceWithInput
      btnText='myResourcesPage.attachments.addAttachment'
      fetchData={fetchGetAttachments}
      link={authRoutes.myResources.root.path}
      searchRef={searchFileName}
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
    pagination: { page, onChange: handleChangePage },
    sx: styles.table
  }

  const addAttachmentBlock = (
    <AddResourceWithInput
      button={
        <AddDocuments
          buttonText={t('myResourcesPage.attachments.addBtn')}
          fetchData={uploadFile}
          formData={formData}
          icon={<AddIcon sx={styles.addAttachmentIcon} />}
          sx={styles.addAttachmentBtn}
          variant={ButtonVariantEnum.Contained}
        />
      }
      fetchData={fetchAttachments}
      searchRef={searchFileName}
    />
  )

  return (
    <Box>
      {addAttachmentBlock}
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Attachment> {...props} />
      )}
    </Box>
  )
}

export default AttachmentsContainer
