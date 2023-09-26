import { FC, useCallback, useState } from 'react'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'

import {
  columns,
  initialSort,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'
import { ajustColumns } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'
import { Attachment, ErrorResponse, ItemsWithCount } from '~/types'
interface AddAttachmentsProps {
  attachments: Attachment[]
  onAddAttachments: (attachments: Attachment[]) => void
}

const AddAttachments: FC<AddAttachmentsProps> = ({
  attachments = [],
  onAddAttachments
}) => {
  const [selectedRows, setSelectedRows] = useState<Attachment[]>(attachments)

  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()

  const breakpoints = useBreakpoints()
  const sortOptions = useSort({
    initialSort
  })
  const { sort } = sortOptions

  const columnsToShow = ajustColumns<Attachment>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyAttachments = useCallback(
    () =>
      ResourceService.getAttachments({
        sort
      }),
    [sort]
  )

  const {
    loading,
    response,
    fetchData: fetchDataAttachments
  } = useAxios<ItemsWithCount<Attachment>>({
    service: getMyAttachments,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const onRowClick = (item: Attachment) => {
    if (selectedRows.find((attachment) => attachment._id === item._id)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((attachment) => attachment._id !== item._id)
      )
    } else {
      setSelectedRows((prevSelectedAttachments) => [
        ...prevSelectedAttachments,
        item
      ])
    }
  }

  const onAddItems = () => {
    onAddAttachments(selectedRows)
    closeModal()
  }
  const getItems = useCallback(
    (inputValue: string) =>
      response.items.filter((item) => {
        const lowerCaseFileName = item.fileName.toLowerCase()
        const lowerCaseInputValue = inputValue.toLocaleLowerCase()
        const fileNameWithoutExtension = lowerCaseFileName
          .split('.')
          .slice(0, -1)
          .join('.')

        return fileNameWithoutExtension.includes(lowerCaseInputValue)
      }),
    [response.items]
  )

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

  const uploadItem = async (data: FormData) => {
    await fetchCreateAttachment(data)
    await fetchDataAttachments()
  }

  const props = {
    columns: columnsToShow,
    sort: sortOptions,
    selectedRows,
    onAddItems,
    data: { loading, getItems },
    onRowClick,
    uploadItem,
    resource: 'attachments'
  }

  return <AddResourceModal<Attachment> {...props} />
}

export default AddAttachments
