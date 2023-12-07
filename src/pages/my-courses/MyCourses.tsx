import { useCallback } from 'react'
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

import { getScreenBasedLimit } from '~/utils/helper-functions'
import { CourseService } from '~/services/course-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { Course, ItemsWithCount, ErrorResponse, CourseForm } from '~/types'
import {
  defaultResponse,
  courseItemsLoadLimit
} from '~/pages/my-courses/MyCourses.constants'
import { snackbarVariants } from '~/constants'

import { styles } from '~/pages/my-courses/MyCourses.styles'

const MyCourses = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { openDialog } = useConfirm()
  const { setAlert } = useSnackBarContext()

  const itemsPerPage = getScreenBasedLimit(breakpoints, courseItemsLoadLimit)

  const getCourses = useCallback(
    () =>
      CourseService.getCourses({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage
      }),
    [itemsPerPage, page]
  )

  const deleteCourse = useCallback(
    (id?: string) => CourseService.deleteCourse(id ?? ''),
    []
  )

  const {
    response: coursesResponse,
    loading: coursesLoading,
    fetchData
  } = useAxios<ItemsWithCount<Course>>({
    service: getCourses,
    defaultResponse
  })

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onDeleteResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: `myCoursesPage.modalMessages.successDeletion`
    })
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
    setAlert({
      severity: snackbarVariants.success,
      message: `myCoursesPage.modalMessages.successDuplication`
    })
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

  const { items: coursesItems, count: coursesCount } = coursesResponse

  if (coursesLoading) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('myCoursesPage.title')}</Typography>
      <Box sx={styles.divider}></Box>
      <AddCourseWithInput />
      {!coursesItems.length && !coursesLoading ? (
        <NotFoundResults
          description={t('myCoursesPage.notFound.description')}
        />
      ) : (
        <>
          <MyCorsesCardsList
            deleteItem={onDelete}
            duplicateItem={(itemId: string) => void handleDuplicate(itemId)}
            items={coursesItems}
          />
          <AppPagination
            onChange={handleChangePage}
            page={page}
            pageCount={Math.ceil(coursesCount / itemsPerPage)}
            sx={styles.pagination}
          />
        </>
      )}
    </PageWrapper>
  )
}

export default MyCourses
