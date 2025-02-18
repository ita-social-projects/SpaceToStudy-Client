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

import { defaultResponses } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/attachments-container/AttachmentsContainer.constants'
import { type Attachment, ResourcesTabsEnum } from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { queryClient } from '~/plugins/queryClient'

const AttachmentsContainer: React.FC = () => {
  const { t } = useTranslation()
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
    data: loadedAttachments,
    isLoading: isLoadingAttachments,
    error: attachmentsLoadError
  } = useQuery({
    queryKey: ['attachments', page, sort, selectedItems],
    queryFn: getAttachments,
    options: {
      staleTime: Infinity
    }
  })

  const invalidateAttachments = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['attachments']
    })
  }

  const { mutate: handleUpdateAttachment } = useMutation({
    mutationFn: ResourceService.updateAttachment,
    onError: handleErrorAlert,
    queryKey: ['attachments']
  })

  const { mutate: handleCreateAttachment } = useMutation({
    mutationFn: ResourceService.createAttachment,
    onError: handleErrorAlert,
    queryKey: ['attachments']
  })

  const onEdit = (id: string) => {
    const attachment = loadedAttachments!.items.find((item) => item._id === id)

    const handleConfirm = () =>
      openModal({
        component: (
          <EditAttachmentModal
            attachment={attachment as Attachment}
            closeModal={closeModal}
            onAttachmentUpdate={handleUpdateAttachment}
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
    const attachment = loadedAttachments!.items.find((item) => item._id === id)

    openModal({
      component: (
        <AddAttachmentCategoryModal
          attachment={attachment as Attachment}
          closeModal={closeModal}
          onAttachmentUpdate={handleUpdateAttachment}
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
      response: loadedAttachments ?? defaultResponses.itemsWithCount,
      getData: invalidateAttachments
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
          onCreateDocument={handleCreateAttachment}
          removePreviousFiles
          sx={styles.addAttachmentBtn}
        />
      }
      fetchData={invalidateAttachments}
      placeholder='myResourcesPage.attachments.searchInput'
      searchRef={searchFileName}
      selectedItems={selectedItems}
      setItems={setSelectedItems}
      sortOptions={sortOptions}
    />
  )

  useEffect(() => {
    if (attachmentsLoadError) {
      handleErrorAlert(attachmentsLoadError)
    }
  }, [attachmentsLoadError, handleErrorAlert])

  return (
    <Box>
      {addAttachmentBlock}
      {isLoadingAttachments ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Attachment> {...props} />
      )}
    </Box>
  )
}

export default AttachmentsContainer
