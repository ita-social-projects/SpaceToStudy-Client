import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'

import { useSnackBarContext } from '~/context/snackbar-context'
import { SortHook } from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useConfirm from '~/hooks/use-confirm'
import usePagination from '~/hooks/table/use-pagination'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

import { snackbarVariants } from '~/constants'
import {
  ErrorResponse,
  TableColumn,
  TableItem,
  ResourcesTableData
} from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

interface MyResourcesTableInterface<T> {
  resource: string
  columns: TableColumn<T>[]
  itemsPerPage: number
  data: ResourcesTableData<T>
  sort: SortHook
  onEdit: (id: string) => void
  deleteService: (id?: string) => Promise<AxiosResponse>
}

const MyResourcesTable = <T extends TableItem>({
  resource,
  columns,
  itemsPerPage,
  data,
  sort,
  onEdit,
  deleteService
}: MyResourcesTableInterface<T>) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { page, handleChangePage } = usePagination()
  const { openDialog } = useConfirm()

  const onDeleteError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onDeleteResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: `myResourcesPage.${resource}.successDeletion`
    })
  }

  const { error, fetchData: deleteItem } = useAxios({
    service: deleteService,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onDeleteError,
    onResponse: onDeleteResponse
  })

  const handleDelete = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await deleteItem(id)
      if (!error) await data.getData()
    }
  }

  const onDelete = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void handleDelete(id, isConfirmed),
      title: `myResourcesPage.${resource}.confirmDeletionTitle`
    })
  }

  const rowActions = [
    {
      label: t('common.edit'),
      func: onEdit
    },
    {
      label: t('common.delete'),
      func: onDelete
    }
  ]

  return (
    <>
      <EnhancedTable<T>
        columns={columns}
        data={{ items: data.response.items }}
        emptyTableKey={`myResourcesPage.${resource}.emptyItems`}
        rowActions={rowActions}
        sort={sort}
        sx={roundedBorderTable}
      />
      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={Math.ceil(data.response.count / itemsPerPage)}
      />
    </>
  )
}

export default MyResourcesTable
