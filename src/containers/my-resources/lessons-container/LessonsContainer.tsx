import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
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
import { useDebounce } from '~/hooks/use-debounce'
import { useDrawer } from '~/hooks/use-drawer'
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
  const [searchInput, setSearchInput] = useState<string>('')
  const searchTitle = useRef<string>()
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useConfirm()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()
  const sortOptions = useSort({ initialSort })
  const { page, handleChangePage } = usePagination()

  const { sort, onRequestSort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getMyLessons = useCallback(() => {
    return ResourceService.getUsersLessons({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sort,
      title: searchTitle.current || ''
    })
  }, [page, itemsPerPage, sort, searchTitle])

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

  const debouncedOnSearchTitle = useDebounce((text: string) => {
    searchTitle.current = text
    void fetchData()
  })

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedOnSearchTitle(e.target.value)
  }

  const onSearchClean = () => {
    setSearchInput('')
    searchTitle.current = ''
    void fetchData()
  }

  const handleNewLesson = () => {
    navigate(createUrlPath(authRoutes.myResources.newLesson.path))
  }

  const handleDeleteLesson = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await fetchDeleteLesson(id)
      if (!error) await fetchData()
    }
  }

  const handleEditLesson = () => {
    openDrawer()
  }

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.lessons.confirmLessonDeletionMessage',
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

  const newLessonBtn = (
    <Box sx={styles.topContainer}>
      <AppButton
        data-testid='newLessonBtn'
        onClick={handleNewLesson}
        sx={styles.addLessonBtn}
      >
        {t('myResourcesPage.lessons.newLessonBtn')}
        <span style={styles.newLessonIcon}>+</span>
      </AppButton>
      <InputWithIcon
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={onSearchChange}
        onClear={onSearchClean}
        placeholder={t('common.search')}
        sx={styles.input}
        value={searchInput}
      />
    </Box>
  )

  const tableWithPagination = (
    <>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: response.items }}
        emptyTableKey='myResourcesPage.lessons.emptyLessons'
        rowActions={rowActions}
        sort={{ sort, onRequestSort }}
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
      {newLessonBtn}
      {loading ? <Loader pageLoad size={50} /> : tableWithPagination}
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        Mocked empty edit lesson text
      </AppDrawer>
    </Box>
  )
}

export default LessonsContainer
