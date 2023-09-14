import { useCallback, useRef } from 'react'
import Box from '@mui/material/Box'

import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { authRoutes } from '~/router/constants/authRoutes'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/questions-container/QuestionsContainer.constants'
import {
  ItemsWithCount,
  GetResourcesParams,
  ErrorResponse,
  ResourcesTabsEnum,
  Question
} from '~/types'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

const QuestionsContainer = () => {
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = ajustColumns<Question>(
    breakpoints,
    columns,
    removeColumnRules
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

  const getQuestions = useCallback(
    () =>
      ResourceService.getQuestions({
        limit: itemsPerPage,
        sort,
        title: searchTitle.current
      }),
    [itemsPerPage, sort]
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Question>,
    GetResourcesParams
  >({
    service: getQuestions,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: () => null },
    itemsPerPage,
    actions: { onEdit: () => null },
    resource: ResourcesTabsEnum.Questions,
    sort: sortOptions,
    pagination: { page: 1, onChange: () => null }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.questions.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newQuestion.path}
        searchRef={searchTitle}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Question> {...props} />
      )}
    </Box>
  )
}

export default QuestionsContainer