import { useTranslation } from 'react-i18next'
import { PaginationProps } from '@mui/material'

import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable, {
  EnhancedTableProps
} from '~/components/enhanced-table/EnhancedTable'

import {
  type TableItem,
  type TableRowAction,
  type ItemsWithCount,
  ResourcesTabsEnum
} from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'

interface MyResourcesTableInterface<T>
  extends Omit<EnhancedTableProps<T, undefined>, 'data'> {
  resourceType: ResourcesTabsEnum
  itemsPerPage: number
  resourceItems: ItemsWithCount<T>
  actions: {
    onEdit: (id: string) => void
    onDuplicate?: (id: string) => void
    onDelete: (id: string) => void
  }
  pagination: PaginationProps
}

const MyResourcesTable = <T extends TableItem>({
  resourceType,
  itemsPerPage,
  resourceItems,
  actions,
  pagination,
  ...props
}: MyResourcesTableInterface<T>) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()
  const { openModal } = useModalContext()

  const { page, onChange } = pagination
  const { onEdit, onDuplicate, onDelete } = actions

  const handleDelete = (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      onDelete(id)
    }
  }

  const handleConfirmDelete = (id: string) => {
    const currentResource = resourceItems.items.find((item) => item._id === id)

    const handleConfirm = () => {
      openDialog({
        message: 'myResourcesPage.confirmDeletionMessage',
        sendConfirm: (isConfirmed: boolean) => handleDelete(id, isConfirmed),
        title: `myResourcesPage.${resourceType}.confirmDeletionTitle`
      })
    }

    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={handleConfirm}
          resourceId={id}
          title={currentResource?.title ?? currentResource?.fileName}
        />
      )
    })
  }

  const rowActions: TableRowAction[] = [
    {
      label:
        resourceType === ResourcesTabsEnum.Categories
          ? t('common.rename')
          : t('common.edit'),
      func: onEdit
    },
    {
      label: t('common.delete'),
      func: handleConfirmDelete
    },
    onDuplicate && {
      label: t('common.duplicate'),
      func: onDuplicate
    }
  ].filter(Boolean) as TableRowAction[]

  return (
    <>
      <EnhancedTable<T>
        data={{ items: resourceItems.items }}
        emptyTableKey={`myResourcesPage.${resourceType}.emptyItems`}
        rowActions={rowActions}
        sx={roundedBorderTable}
        {...props}
      />
      <AppPagination
        onChange={onChange}
        page={page}
        pageCount={Math.ceil(resourceItems.count / itemsPerPage)}
      />
    </>
  )
}

export default MyResourcesTable
