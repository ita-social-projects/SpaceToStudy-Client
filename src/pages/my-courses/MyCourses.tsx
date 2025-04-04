import { useCallback, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Box } from '@mui/material'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'
import MyCorsesCardsList from '~/containers/my-courses/my-courses-container/MyCorsesCardsList'

import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import usePagination from '~/hooks/table/use-pagination'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import useSort from '~/hooks/table/use-sort'
import { useFilterQuery } from '~/hooks/use-filter-query'

import { getScreenBasedLimit } from '~/utils/helper-functions'
import { countActiveCourseFilters } from '~/utils/count-active-filters'
import { CourseService } from '~/services/course-service'
import { type CourseForm } from '~/types'
import { initialSort } from '~/containers/find-course/courses-filter-bar/CorseFilterBar.constants'
import { courseItemsLoadLimit } from '~/pages/my-courses/MyCourses.constants'
import { coursesDefaultFilters } from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal.constants'
import { defaultResponses, snackbarVariants } from '~/constants'

import { styles } from '~/pages/my-courses/MyCourses.styles'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

const MyCourses = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openDialog } = useConfirm()
  const { sort, onRequestSort } = useSort({ initialSort })
  const itemsPerPage = getScreenBasedLimit(breakpoints, courseItemsLoadLimit)
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const { filters, activeFilterCount, searchParams, filterQueryActions } =
    useFilterQuery({
      defaultFilters: coursesDefaultFilters,
      countActiveFilters: countActiveCourseFilters
    })

  const getCourses = useCallback(() => {
    return CourseService.getCourses({
      ...filters,
      limit: itemsPerPage,
      skip: (Number(filters.page) - 1) * itemsPerPage,
      sort
    })
  }, [filters, itemsPerPage, sort])

  const deleteCourse = useCallback(
    (id?: string) => CourseService.deleteCourse(id ?? ''),
    []
  )

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses', filters, itemsPerPage, sort, searchParams.toString()],
    queryFn: getCourses,
    options: {
      staleTime: Infinity
    }
  })

  const onDeleteResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: `myCoursesPage.modalMessages.successDeletion`
    })
  }

  const { mutate: deleteItem } = useMutation({
    queryKey: ['courses'],
    mutationFn: deleteCourse,
    onError: handleErrorAlert,
    onSuccess: onDeleteResponse
  })

  const handleDeleteCourse = (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      deleteItem(id)
    }
  }

  const onDelete = (id: string) => {
    openDialog({
      message: 'myCoursesPage.modalMessages.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) =>
        handleDeleteCourse(id, isConfirmed),
      title: `myCoursesPage.modalMessages.confirmDeletionTitle`
    })
  }

  const duplicateCourse = useCallback(
    (id: string) => {
      const item = courses?.items.find(
        (element) => element._id === id
      ) as CourseForm

      return CourseService.addCourse(item)
    },
    [courses?.items]
  )

  const onDuplicateResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: `myCoursesPage.modalMessages.successDuplication`
    })
  }

  const { mutate: duplicateItem } = useMutation({
    queryKey: ['courses'],
    mutationFn: duplicateCourse,
    onError: handleErrorAlert,
    onSuccess: onDuplicateResponse
  })

  const defaultParams = { page: coursesDefaultFilters.page }

  const { items: coursesItems, count: coursesCount } =
    courses ?? defaultResponses.itemsWithCount

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
        duplicateItem={duplicateItem}
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
