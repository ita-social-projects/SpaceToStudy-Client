import { useCallback, useEffect, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'
import MyCorsesCardsList from '~/containers/my-courses/my-courses-container/MyCorsesCardsList'

import useAxios from '~/hooks/use-axios'
import usePagination from '~/hooks/table/use-pagination'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import useSort from '~/hooks/table/use-sort'
import { useFilterQuery } from '~/hooks/use-filter-query'

import { getScreenBasedLimit } from '~/utils/helper-functions'
import { countActiveCourseFilters } from '~/utils/count-active-filters'
import { CourseService } from '~/services/course-service'
import { useAppDispatch } from '~/hooks/use-redux'
import {
  Course,
  ItemsWithCount,
  ErrorResponse,
  CourseForm,
  GetCoursesParams
} from '~/types'
import { initialSort } from '~/containers/find-course/courses-filter-bar/CorseFilterBar.constants'
import {
  defaultResponse,
  courseItemsLoadLimit
} from '~/pages/my-courses/MyCourses.constants'
import { coursesDefaultFilters } from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal.constants'
import { snackbarVariants } from '~/constants'

import { styles } from '~/pages/my-courses/MyCourses.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const MyCourses = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openDialog } = useConfirm()
  const dispatch = useAppDispatch()
  const { sort, onRequestSort } = useSort({ initialSort })
  const itemsPerPage = getScreenBasedLimit(breakpoints, courseItemsLoadLimit)

  const { filters, activeFilterCount, searchParams, filterQueryActions } =
    useFilterQuery({
      defaultFilters: coursesDefaultFilters,
      countActiveFilters: countActiveCourseFilters
    })

  const getCourses = useCallback(
    (params?: GetCoursesParams) => CourseService.getCourses(params),
    []
  )

  const deleteCourse = useCallback(
    (id?: string) => CourseService.deleteCourse(id ?? ''),
    []
  )

  const {
    response: coursesResponse,
    loading: coursesLoading,
    fetchData
  } = useAxios<ItemsWithCount<Course>, GetCoursesParams>({
    service: getCourses,
    defaultResponse,
    fetchOnMount: false
  })

  const onResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const onDeleteResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: `myCoursesPage.modalMessages.successDeletion`
      })
    )
  }

  const { error, fetchData: deleteItem } = useAxios({
    service: deleteCourse,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDeleteResponse
  })

  const handleDelete = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await deleteItem(id)
      if (!error) await fetchData()
    }
  }

  const onDelete = (id: string) => {
    openDialog({
      message: 'myCoursesPage.modalMessages.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void handleDelete(id, isConfirmed),
      title: `myCoursesPage.modalMessages.confirmDeletionTitle`
    })
  }

  const duplicateCourse = useCallback(
    (id?: string) => {
      const item = coursesResponse.items.find(
        (element) => element._id === id
      ) as CourseForm

      return CourseService.addCourse(item)
    },
    [coursesResponse.items]
  )

  const onDuplicateResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: `myCoursesPage.modalMessages.successDuplication`
      })
    )
  }

  const { error: duplicationError, fetchData: duplicateItem } = useAxios({
    service: duplicateCourse,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDuplicateResponse
  })

  const handleDuplicate = async (itemId: string) => {
    await duplicateItem(itemId)
    if (!duplicationError) await fetchData()
  }

  const updateInfo = useCallback(() => {
    void fetchData({
      ...filters,
      limit: itemsPerPage,
      skip: (Number(filters.page) - 1) * itemsPerPage,
      sort
    })
  }, [fetchData, filters, itemsPerPage, sort])

  const searchString = searchParams.toString()

  useEffect(() => {
    updateInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, searchString, sort])

  const defaultParams = { page: coursesDefaultFilters.page }

  const { items: coursesItems, count: coursesCount } = coursesResponse

  const { pageCount } = usePagination({
    itemsCount: coursesCount,
    itemsPerPage
  })

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    filterQueryActions.updateFiltersInQuery({ page })
  }

  const content = coursesLoading ? (
    <Loader pageLoad />
  ) : (
    <>
      <MyCorsesCardsList
        deleteItem={onDelete}
        duplicateItem={(itemId: string) => void handleDuplicate(itemId)}
        items={coursesItems}
      />
      <AppPagination
        onChange={handlePageChange}
        page={Number(filters.page)}
        pageCount={pageCount}
        sx={styles.pagination}
      />
    </>
  )

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('myCoursesPage.title')}</Typography>
      <Box sx={styles.divider}></Box>
      <AddCourseWithInput
        additionalParams={defaultParams}
        chosenFiltersQty={activeFilterCount}
        filterActions={filterQueryActions}
        filters={filters}
        setSort={onRequestSort}
        sort={`${sort.orderBy} ${sort.order}`}
      />
      {!coursesItems.length && !coursesLoading ? (
        <NotFoundResults
          description={t('myCoursesPage.notFound.description')}
        />
      ) : (
        content
      )}
    </PageWrapper>
  )
}

export default MyCourses
