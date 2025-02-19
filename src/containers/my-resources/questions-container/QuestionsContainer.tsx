import { useCallback, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import type { AxiosResponse } from 'axios'

import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { authRoutes } from '~/router/constants/authRoutes'
import usePagination from '~/hooks/table/use-pagination'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules,
  DuplicateQuestionErrors
} from '~/containers/my-resources/questions-container/QuestionsContainer.constants'
import { ResourcesTabsEnum, type Question } from '~/types'
import { getFullUrl } from '~/utils/get-full-url'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

const QuestionsContainer: React.FC = () => {
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef('')
  const breakpoints = useBreakpoints()
  const queryClient = useQueryClient()
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Question>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getQuestions = useCallback(() => {
    return ResourceService.getQuestionsQuery({
      limit: itemsPerPage,
      sort,
      title: searchTitle.current,
      skip: (page - 1) * itemsPerPage,
      categories: selectedItems
    })
  }, [itemsPerPage, sort, page, selectedItems])

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    error: questionsError,
    refetch: refetchQuestions
  } = useQuery({
    queryKey: ['questions', itemsPerPage, sort, page, selectedItems],
    queryFn: getQuestions,
    options: {
      staleTime: Infinity
    }
  })

  const deleteQuestion = useCallback(
    async (id?: string): Promise<AxiosResponse<unknown>> => {
      const response = await ResourceService.deleteQuestion(id ?? '')
      await queryClient.invalidateQueries({ queryKey: ['questions'] })
      return response
    },
    [queryClient]
  )

  const editQuestion = (id: string) => {
    navigate(
      getFullUrl({
        pathname: authRoutes.myResources.editQuestion.route,
        parameters: { id }
      })
    )
  }

  const duplicateQuestion = useCallback(
    async (id: string) => {
      if (!questions) {
        handleErrorAlert(DuplicateQuestionErrors.QUESTIONS_NOT_FOUND)
        return
      }

      const item = questions.items.find((element) => element._id === id)

      if (!item) {
        handleErrorAlert(DuplicateQuestionErrors.QUESTION_NOT_FOUND)
        return
      }

      return await ResourceService.createQuestionQuery({
        title: item.title,
        text: item.text,
        answers: item.answers,
        category: item.category?._id ?? null,
        type: item.type
      })
    },
    [questions, handleErrorAlert]
  )

  const onDuplicateResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: `myResourcesPage.questions.successDuplication`
    })
  }

  const { mutate: duplicateItem } = useMutation({
    queryKey: ['questions', itemsPerPage, sort, page, selectedItems],
    mutationFn: duplicateQuestion,
    onSuccess: onDuplicateResponse,
    onError: handleErrorAlert
  })

  useEffect(() => {
    if (questionsError) {
      handleErrorAlert(questionsError)
    }
  }, [handleErrorAlert, questionsError])

  const props = {
    columns: columnsToShow,
    data: {
      response: questions ?? defaultResponses.itemsWithCount,
      getData: getQuestions
    },
    services: {
      deleteService: deleteQuestion
    },
    itemsPerPage,
    actions: {
      onEdit: editQuestion,
      onDuplicate: duplicateItem
    },
    resource: ResourcesTabsEnum.Questions,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText='myResourcesPage.questions.addBtn'
        fetchData={refetchQuestions}
        link={authRoutes.myResources.newQuestion.path}
        placeholder='myResourcesPage.questions.searchInput'
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {isQuestionsLoading || !questions ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Question> {...props} />
      )}
    </Box>
  )
}

export default QuestionsContainer
