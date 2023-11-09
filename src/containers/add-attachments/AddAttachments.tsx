import { FC, useCallback, useState } from 'react'

import { ResourceService } from '~/services/resource-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useModalContext } from '~/context/modal-context'
import useSelect from '~/hooks/table/use-select'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'

import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'

import {
  columns,
  initialSort,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'
import { defaultResponses, snackbarVariants } from '~/constants'

import { ajustColumns } from '~/utils/helper-functions'
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
  const initialSelect = attachments.map((attachment) => attachment._id)
  const select = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })

  const { sort } = sortOptions
  const { handleSelectClick } = select

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

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const { loading, response } = useAxios<ItemsWithCount<Attachment>>({
    service: getMyAttachments,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onRowClick = (item: Attachment) => {
    if (selectedRows.find((attachment) => attachment._id === item._id)) {
      setSelectedRows((selectedRows) =>
        selectedRows.filter((attachment) => attachment._id !== item._id)
      )
    } else {
      setSelectedRows((selectedRows) => [...selectedRows, item])
    }
    handleSelectClick(undefined, item._id)
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

  const props = {
    columns: columnsToShow,
    sort: sortOptions,
    select,
    selectedRows,
    isSelection: true,
    onAddItems,
    data: { loading, getItems },
    onRowClick,
    resource: 'attachments'
  }

  return <AddResourceModal<Attachment> {...props} />
}

export default AddAttachments
