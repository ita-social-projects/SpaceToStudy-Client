import { useCallback, useRef, useState } from 'react'
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
import {
  ItemsWithCount,
  GetResourcesParams,
  Attachment,
  ErrorResponse,
  UpdateAttachmentParams,
  ResourcesTabsEnum,
  ButtonVariantEnum
} from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/attachments-container/AttachmentsContainer.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

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

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onResponseError = useCallback(
    (error?: ErrorResponse) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

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
    onResponseError,
    onResponse: onAttachmentUpdate,
    fetchOnMount: false
  })

  const createAttachments = useCallback(
    (data?: FormData) => ResourceService.createAttachments(data),
    []
  )

  const onCreateAttachmentsError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
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

  const onEdit = (id: string) => {
    const attachment = response.items.find((item) => item._id === id)

    openModal({
      component: (
        <EditAttachmentModal
          attachment={attachment as Attachment}
          closeModal={closeModal}
          updateAttachment={updateData}
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
          updateAttachmentCategory={updateData}
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
          removePreviousFiles
          sx={styles.addAttachmentBtn}
          variant={ButtonVariantEnum.Contained}
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
