import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'

import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'

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
  ResourcesTabsEnum
} from '~/types'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'

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
    (error: ErrorResponse, message?: string) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? message ?? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

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

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Attachment>,
    GetResourcesParams
  >({
    service: getAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onAttachmentUpdate = useCallback(() => void fetchData(), [fetchData])

  const { fetchData: updateData } = useAxios({
    service: updateAttachment,
    defaultResponse: null,
    onResponseError: onResponseError,
    onResponse: onAttachmentUpdate,
    fetchOnMount: false
  })

  const onSave = async (fileName: string) => {
    if (fileName) await updateData({ id: selectedItemId, fileName })
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = ajustColumns(
    breakpoints,
    columns(selectedItemId, onCancel, onSave),
    removeColumnRules
  )

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    deleteService: deleteAttachment,
    itemsPerPage,
    onEdit,
    resource: ResourcesTabsEnum.Attachments,
    sort: sortOptions
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.attachments.addBtn'}
        fetchData={fetchData}
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
