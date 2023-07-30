import { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import Loader from '~/components/loader/Loader'
import {
  columns,
  defaultResponse,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'

import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { useDrawer } from '~/hooks/use-drawer'
import { ResourceService } from '~/services/resource-service'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'

import { useDebounce } from '~/hooks/use-debounce'
import { ItemsWithCount, Lesson } from '~/types'

const LessonsContainer = () => {
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { openDialog } = useConfirm()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const [searchTitle, setSearchTitle] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const sortOptions = useSort({
    initialSort
  })
  const { sort, onRequestSort } = sortOptions

  const { page, handleChangePage } = usePagination()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const debouncedOnSearchTitle = useDebounce((text: string) => {
    setSearchTitle(text)
  })

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedOnSearchTitle(e.target.value)
  }

  const getMyLessons = useCallback(
    () =>
      ResourceService.getUsersLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle
      }),
    [page, itemsPerPage, sort, searchTitle]
  )

  const { loading, response, fetchData } = useAxios<ItemsWithCount<Lesson>>({
    service: getMyLessons,
    defaultResponse
  })

  const onSearchClean = () => {
    setSearchInput('')
    debouncedOnSearchTitle('')
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
      <AppButton onClick={newLesson} sx={styles.addLessonBtn}>
        New lesson <span style={styles.newLessonIcon}>+</span>
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
