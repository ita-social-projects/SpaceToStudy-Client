import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import usePagination from '~/hooks/table/use-pagination'

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
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

const QuestionsContainer = () => {
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

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
        title: searchTitle.current,
        skip: (page - 1) * itemsPerPage,
        categories: selectedItems
      }),
    [itemsPerPage, sort, page, selectedItems]
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Question>,
    GetResourcesParams
  >({
    service: getQuestions,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const deleteQuestion = useCallback(
    (id?: string) => ResourceService.deleteQuestion(id ?? ''),
    []
  )

  const editQuestion = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editQuestion.path, id))
  }

  const duplicateQuestion = useCallback(
    (id?: string) => {
      const item = response.items.find(
        (element) => element._id === id
      ) as Question

      return ResourceService.createQuestion({
        title: item.title,
        text: item.text,
        answers: item.answers,
        category: item.category?._id ?? null,
        type: item.type
      })
    },
    [response.items]
  )

  const onDuplicateError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onDuplicateResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: `myResourcesPage.questions.successDuplication`
    })
  }

  const { error: duplicationError, fetchData: duplicateItem } = useAxios({
    service: duplicateQuestion,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onDuplicateError,
    onResponse: onDuplicateResponse
  })

  const handleDuplicate = async (itemId: string) => {
    await duplicateItem(itemId)
    if (!duplicationError) await fetchData()
  }

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: {
      deleteService: deleteQuestion
    },
    itemsPerPage,
    actions: {
      onEdit: editQuestion,
      onDuplicate: (itemId: string) => handleDuplicate(itemId)
    },
    resource: ResourcesTabsEnum.Questions,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.questions.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newQuestion.path}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
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
