import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useConfirm from '~/hooks/use-confirm'
import { quizService } from '~/services/quiz-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import Loader from '~/components/loader/Loader'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'

import {
  columns,
  removeColumnRules,
  itemsLoadLimit
} from '~/containers/my-quizzes/QuizzesContainer.constants'
import { ErrorResponse, ItemsWithCount, Quiz, SortEnum } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-quizzes/QuizzesContainer.styles'

const TestsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useConfirm()
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const onGetQuizzesError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

  const onDeleteQuizError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onDeleteQuizResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'myResourcesPage.quizzes.successDeletion'
    })
  }

  const getQuizzes = useCallback(
    () =>
      quizService.getQuizzes({
        limit: itemsPerPage,
        title: searchTitle.current
      }),
    [itemsPerPage, searchTitle]
  )

  const deleteQuiz = useCallback(
    (id?: string) => quizService.deleteQuiz(id ?? ''),
    []
  )

  const { response, loading, fetchData } = useAxios<ItemsWithCount<Quiz>>({
    service: getQuizzes,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError: onGetQuizzesError
  })

  const { error, fetchData: fetchDeleteLesson } = useAxios({
    service: deleteQuiz,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onDeleteQuizError,
    onResponse: onDeleteQuizResponse
  })

  const handleDeleteQuiz = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await fetchDeleteLesson(id)
      if (!error) await fetchData()
    }
  }

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeleteQuiz(id, isConfirmed),
      title: 'myResourcesPage.quizzes.confirmQuizDeletionTitle'
    })
  }

  const rowActions = [
    {
      label: t('common.edit'),
      func: () => undefined
    },
    {
      label: t('common.delete'),
      func: openDeletionConfirmDialog
    }
  ]

  const table = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items: response.items }}
      emptyTableKey='myResourcesPage.quizzes.emptyQuizzes'
      rowActions={rowActions}
      sort={{
        sort: { order: SortEnum.Desc, orderBy: 'updatedAt' },
        onRequestSort: () => null
      }}
      sx={styles.table}
    />
  )

  return (
    <Box>
      <AddResourceWithInput
        btnText='myResourcesPage.quizzes.newQuizBtn'
        fetchData={fetchData}
        onClick={() => null}
        searchRef={searchTitle}
      />
      {loading ? <Loader pageLoad size={50} /> : table}
    </Box>
  )
}

export default TestsContainer
