import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useAppDispatch } from '~/hooks/use-redux'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'
import { authRoutes } from '~/router/constants/authRoutes'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-quizzes/QuizzesContainer.constants'

import {
  ItemsWithCount,
  GetResourcesParams,
  Quiz,
  ErrorResponse,
  ResourcesTabsEnum
} from '~/types'
import {
  adjustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const QuizzesContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Quiz>(
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

  const getQuizzes = useCallback(
    () =>
      ResourceService.getQuizzes({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current,
        categories: selectedItems
      }),
    [itemsPerPage, sort, searchTitle, page, selectedItems]
  )

  const deleteQuiz = useCallback(
    (id?: string) => ResourceService.deleteQuiz(id ?? ''),
    []
  )

  const onEdit = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editQuiz.path, id))
  }

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Quiz>,
    GetResourcesParams
  >({
    service: getQuizzes,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: deleteQuiz },
    itemsPerPage,
    actions: { onEdit },
    resource: ResourcesTabsEnum.Quizzes,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.quizzes.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newQuiz.path}
        placeholder={'myResourcesPage.quizzes.searchInput'}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Quiz> {...props} />
      )}
    </Box>
  )
}

export default QuizzesContainer
