import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'
import { ResourceService } from '~/services/resource-service'
import EditAttachmentModal from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import AddAttachmentCategoryModal from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import AddDocuments from '~/containers/add-documents/AddDocuments'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import {
  type ItemsWithCount,
  type Attachment,
  type ErrorResponse,
  ResourcesTabsEnum
} from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

const AttachmentsContainer = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { openModal, closeModal } = useModalContext()
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchFileName = useRef<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const formData = new FormData()
  const { handleErrorAlert } = useSnackbarAlert()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getAttachments = useCallback(
    () =>
      ResourceService.getAttachments({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        fileName: searchFileName.current,
        categories: selectedItems
      }),
    [itemsPerPage, page, sort, searchFileName, selectedItems]
  )

  const deleteAttachment = useCallback(
    (id?: string) => ResourceService.deleteAttachment(id ?? ''),
    []
  )

  const {
    data: response,
    isLoading: loading,
    refetch: refetchAttachments,
    error: fetchAttachmentsError
  } = useQuery<ItemsWithCount<Attachment>>({
    queryKey: [
      'attachments',
      page,
      sort,
      searchFileName.current,
      selectedItems
    ],
    queryFn: getAttachments,
    options: {
      initialData: defaultResponses.itemsWithCount
    }
  })

  const fetchAttachments = async (): Promise<void> => {
    await refetchAttachments()
  }

  const { mutate: updateAttachment } = useMutation({
    mutationFn: ResourceService.updateAttachment,
    onError: handleErrorAlert,
    queryKey: ['attachments']
  })

  const onCreateAttachmentsError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const { mutate: createAttachment } = useMutation({
    mutationFn: ResourceService.createAttachment,
    onError: onCreateAttachmentsError,
    queryKey: ['attachments']
  })

  const onEdit = (id: string) => {
    const attachment = response.items.find((item) => item._id === id)

    const handleConfirm = () =>
      openModal({
        component: (
          <EditAttachmentModal
            attachment={attachment as Attachment}
            closeModal={closeModal}
            onAttachmentUpdate={updateAttachment}
          />
        )
      })

    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={handleConfirm}
          resourceId={id}
          title={attachment?.fileName}
        />
      )
    })
  }

  const onAddCategory = (id: string) => {
    const attachment = response.items.find((item) => item._id === id)

    openModal({
      component: (
        <AddAttachmentCategoryModal
          attachment={attachment as Attachment}
          closeModal={closeModal}
          onAttachmentUpdate={updateAttachment}
        />
      )
    })
  }

  const columnsToShow = adjustColumns(
    breakpoints,
    columns(onAddCategory),
    removeColumnRules
  )

  const props = {
    columns: columnsToShow,
    data: {
      response: response ?? defaultResponses.itemsWithCount,
      getData: fetchAttachments
    },
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
          formData={formData}
          icon={<AddIcon sx={styles.addAttachmentIcon} />}
          onCreateDocument={createAttachment}
          removePreviousFiles
          sx={styles.addAttachmentBtn}
        />
      }
      fetchData={fetchAttachments}
      placeholder={'myResourcesPage.attachments.searchInput'}
      searchRef={searchFileName}
      selectedItems={selectedItems}
      setItems={setSelectedItems}
      sortOptions={sortOptions}
    />
  )

  useEffect(() => {
    if (fetchAttachmentsError) {
      handleErrorAlert(fetchAttachmentsError as ErrorResponse)
    }
  }, [fetchAttachmentsError, handleErrorAlert])

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
