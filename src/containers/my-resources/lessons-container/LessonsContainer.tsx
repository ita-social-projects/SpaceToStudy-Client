import { useTranslation } from 'react-i18next'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'

import { ChangeEvent, useCallback, useState } from 'react'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppPagination from '~/components/app-pagination/AppPagination'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import Loader from '~/components/loader/Loader'
import { itemsLoadLimit } from '~/constants'
import {
  columns,
  defaultResponse,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { ResourceService } from '~/services/resource-service'
import { ItemsWithCount, Lesson, SortEnum } from '~/types'

const LessonsContainer = () => {
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const { page, handleChangePage } = usePagination()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [_selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  // change naming like in other similar pages
  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // here too
  const handleOnSearchClean = () => {
    setSearch('')
  }

  const getMyLessons = useCallback(() => ResourceService.getUsersLessons(), [])

  const { loading, response, fetchData } = useAxios<ItemsWithCount<Lesson>>({
    service: getMyLessons,
    defaultResponse
  })

  const refetchLessons = async () => {
    await fetchData()
  }

  const deleteLesson = async (id: string) => {
    await ResourceService.deleteLesson(id)
  }

  const editLesson = (id: string) => {
    openDrawer()
    const lesson = response.items.find(({ _id }) => _id === id) ?? null
    setSelectedLesson(lesson)
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
      func: deleteLesson
    }
  ]

  return (
    <Box>
      {loading && <Loader pageLoad size={50} />}
      <Box sx={styles.topContainer}>
        <AppButton sx={styles.addLessonBtn}>
          New lesson <span style={styles.newLessonIcon}>+</span>
        </AppButton>
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={handleOnSearch}
          onClear={handleOnSearchClean}
          placeholder={t('common.search')}
          sx={styles.input}
          value={search}
        />
      </Box>
      <EnhancedTable
        columns={columnsToShow}
        data={{ items: response.items, getData: refetchLessons }}
        emptyTableKey='myResourcesPage.lessons.emptyLessons'
        rowActions={rowActions}
        sort={{
          sort: {
            order: SortEnum.Asc,
            orderBy: 'title'
          },
          onRequestSort: (columnField: string) => {
            //
          }
        }}
      />

      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={Math.ceil(response.count / itemsPerPage)}
      />
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        EditLesson EditLesson EditLesson EditLesson
      </AppDrawer>
    </Box>
  )
}

export default LessonsContainer
