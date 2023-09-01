import Box from '@mui/material/Box'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import Loader from '~/components/loader/Loader'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import { useSnackBarContext } from '~/context/snackbar-context'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { authRoutes } from '~/router/constants/authRoutes'
import { ResourceService } from '~/services/resource-service'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  ErrorResponse,
  GetLessonsParams,
  ItemsWithCount,
  Lesson
} from '~/types'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

const LessonsContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useConfirm()
  const breakpoints = useBreakpoints()
  const sortOptions = useSort({ initialSort })
  const { page, handleChangePage } = usePagination()
  const navigate = useNavigate()

  const { sort, onRequestSort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getMyLessons = useCallback(
    () =>
      ResourceService.getUsersLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current
      }),
    [page, itemsPerPage, sort, searchTitle]
  )

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id || ''),
    []
  )

  const { loading, response, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetLessonsParams
  >({
    service: getMyLessons,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const onLessonDeletionError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onResponseDeletion = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'myResourcesPage.lessons.successDeletion'
    })
  }

  const { error, fetchData: fetchDeleteLesson } = useAxios({
    service: deleteLesson,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onLessonDeletionError,
    onResponse: onResponseDeletion
  })

  const handleDeleteLesson = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await fetchDeleteLesson(id)
      if (!error) await fetchData()
    }
  }

  const handleEditLesson = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, id))
  }

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeleteLesson(id, isConfirmed),
      title: 'myResourcesPage.lessons.confirmLessonDeletionTitle'
    })
  }

  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const rowActions = [
    {
      label: t('common.edit'),
      func: handleEditLesson
    },
    {
      label: t('common.delete'),
      func: openDeletionConfirmDialog
    }
  ]

  const tableWithPagination = (
    <>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: response.items }}
        emptyTableKey='myResourcesPage.lessons.emptyLessons'
        rowActions={rowActions}
        sort={{ sort, onRequestSort }}
        sx={styles.table}
      />
      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={Math.ceil(response.count / itemsPerPage)}
      />
    </>
  )

  return (
    <Box>
      <AddResourceWithInput
        btnText='myResourcesPage.lessons.newLessonBtn'
        fetchData={fetchData}
        link={authRoutes.myResources.newLesson.path}
        searchRef={searchTitle}
      />
      {loading ? <Loader pageLoad size={50} /> : tableWithPagination}
    </Box>
  )
}

export default LessonsContainer
