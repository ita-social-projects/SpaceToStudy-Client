import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'

import { useSnackBarContext } from '~/context/snackbar-context'
import { quizService } from '~/services/quiz-service'
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
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

const QuizzesContainer = () => {
  const { setAlert } = useSnackBarContext()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = ajustColumns<Quiz>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

  const getQuizzes = useCallback(
    () =>
      quizService.getQuizzes({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current,
        categories: selectedItems
      }),
    [itemsPerPage, sort, searchTitle, page, selectedItems]
  )

  const deleteQuiz = useCallback(
    (id?: string) => quizService.deleteQuiz(id ?? ''),
    []
  )

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
    actions: { onEdit: () => null },
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
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        showNoneProperty
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
