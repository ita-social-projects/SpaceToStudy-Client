import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { ChangeEvent, useCallback, useRef, useState } from 'react'

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
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { useDebounce } from '~/hooks/use-debounce'
import { useDrawer } from '~/hooks/use-drawer'
import { ResourceService } from '~/services/resource-service'

import { defaultResponses } from '~/constants'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { ItemsWithCount, Lesson, Sort } from '~/types'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

interface LessonsParams {
  title: string
  skip: number
  limit: number
  sort: Sort
}

const LessonsContainer = () => {
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { openDialog } = useConfirm()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const [searchInput, setSearchInput] = useState('')
  const sortOptions = useSort({
    initialSort
  })
  const { sort, onRequestSort } = sortOptions

  const { page, handleChangePage } = usePagination()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const searchTitle = useRef<string>()

  const getMyLessons = useCallback(() => {
    return ResourceService.getUsersLessons({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sort,
      title: searchTitle.current || ''
    })
  }, [page, itemsPerPage, sort, searchTitle.current])

  const { loading, response, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    LessonsParams
  >({
    service: getMyLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: true
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

  const newLesson = () => {
    navigate(createUrlPath(authRoutes.myResources.newLesson.path))
  }

  const deleteLesson = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await ResourceService.deleteLesson(id)
      await fetchData()
    }
  }

  const editLesson = () => {
    openDrawer()
  }

  const openDeletionConfirmDialog = (id: string) => {
    openDialog({
      message: 'myResourcesPage.lessons.confirmLessonDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void deleteLesson(id, isConfirmed),
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
      func: editLesson
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
        onClick={newLesson}
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
