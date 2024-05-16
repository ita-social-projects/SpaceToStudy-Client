import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import { PaginationProps } from '@mui/material'

import { useAppDispatch } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import useConfirm from '~/hooks/use-confirm'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable, {
  EnhancedTableProps
} from '~/components/enhanced-table/EnhancedTable'

import { snackbarVariants } from '~/constants'
import {
  ErrorResponse,
  TableItem,
  ResourcesTableData,
  TableRowAction,
  ResourcesTabsEnum
} from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface MyResourcesTableInterface<T>
  extends Omit<EnhancedTableProps<T, undefined>, 'data'> {
  resource: ResourcesTabsEnum
  itemsPerPage: number
  data: ResourcesTableData<T>
  actions: {
    onEdit: (id: string) => void
    onDuplicate?: (id: string) => void
  }
  services: { deleteService: (id?: string) => Promise<AxiosResponse> }
  pagination: PaginationProps
}

const MyResourcesTable = <T extends TableItem>({
  resource,
  itemsPerPage,
  data,
  actions,
  services,
  pagination,
  ...props
}: MyResourcesTableInterface<T>) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { openDialog } = useConfirm()

  const { page, onChange } = pagination
  const { response, getData } = data
  const { onEdit, onDuplicate } = actions

  const onDeleteError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const onDeleteResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: `myResourcesPage.${resource}.successDeletion`
      })
    )
  }

  const { error, fetchData: deleteItem } = useAxios({
    service: services.deleteService,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onDeleteError,
    onResponse: onDeleteResponse
  })

  const handleDelete = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await deleteItem(id)
      if (!error) await getData()
    }
  }

  const onDelete = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void handleDelete(id, isConfirmed),
      title: `myResourcesPage.${resource}.confirmDeletionTitle`
    })
  }

  const rowActions: TableRowAction[] = [
    {
      label:
        resource === ResourcesTabsEnum.Categories
          ? t('common.rename')
          : t('common.edit'),
      func: onEdit
    },
    {
      label: t('common.delete'),
      func: onDelete
    },
    onDuplicate && {
      label: t('common.duplicate'),
      func: onDuplicate
    }
  ].filter(Boolean) as TableRowAction[]

  return (
    <>
      <EnhancedTable<T>
        data={{ items: response.items }}
        emptyTableKey={`myResourcesPage.${resource}.emptyItems`}
        rowActions={rowActions}
        sx={roundedBorderTable}
        {...props}
      />
      <AppPagination
        onChange={onChange}
        page={page}
        pageCount={Math.ceil(response.count / itemsPerPage)}
      />
    </>
  )
}

export default MyResourcesTable
