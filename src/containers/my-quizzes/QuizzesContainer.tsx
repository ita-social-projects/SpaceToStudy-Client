import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import useAxios from '~/hooks/use-axios'
import { quizService } from '~/services/quiz-service'
import Loader from '~/components/loader/Loader'
import { useSnackBarContext } from '~/context/snackbar-context'
import useBreakpoints from '~/hooks/use-breakpoints'

import {
  columns,
  removeColumnRules,
  itemsLoadLimit
} from '~/containers/my-quizzes/QuizzesContainer.constants'
import { ErrorResponse, ItemsWithCount, QuizInterface, SortEnum } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-quizzes/QuizzesContainer.styles'

const TestsContainer = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const onQuizzesError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

  const getOffers = useCallback(
    () =>
      quizService.getQuizzes({
        limit: itemsPerPage
      }),
    [itemsPerPage]
  )

  const { response, loading } = useAxios<ItemsWithCount<QuizInterface>>({
    service: getOffers,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError: onQuizzesError
  })

  const rowActions = [
    {
      label: t('common.edit'),
      func: () => undefined
    },
    {
      label: t('common.delete'),
      func: () => undefined
    }
  ]

  return (
    <Box>
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
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
      )}
    </Box>
  )
}

export default TestsContainer
