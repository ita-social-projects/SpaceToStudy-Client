import { ItemsWithCount, GetResourcesParams } from '~/types'

export type ResourcesTableData<T> = {
  response: ItemsWithCount<T>
  getData: (params?: GetResourcesParams) => Promise<void> | void
}
