import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'

import { defaultResponses, snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import {
  ItemsWithCount,
  GetResourcesParams,
  Lesson,
  ErrorResponse,
  ResourcesTabsEnum
} from '~/types'
import {
  adjustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const LessonsContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

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

  const getMyLessons = useCallback(
    () =>
      ResourceService.getUsersLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current,
        categories: selectedItems
      }),
    [page, itemsPerPage, sort, searchTitle, selectedItems]
  )

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id || ''),
    []
  )

  const onEdit = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, id))
  }

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetResourcesParams
  >({
    service: getMyLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: deleteLesson },
    itemsPerPage,
    actions: { onEdit },
    resource: ResourcesTabsEnum.Lessons,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.lessons.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newLesson.path}
        placeholder={'myResourcesPage.lessons.searchInput'}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
