import { useCallback, useMemo, useState } from 'react'
import useAxios from './use-axios'
import { Course, GetCoursesParams, ItemsWithCount } from '~/types'
import { CourseService } from '~/services/course-service'

const useChangeConfirm = (id: string | undefined) => {
  const { response: coursesResponse } = useAxios<
    ItemsWithCount<Course>,
    GetCoursesParams
  >({
    service: CourseService.getCourses,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: true
  })

  const coursesFiltered = useMemo(
    () =>
      coursesResponse.items
        .filter((item) => item.sections[0].resources?.length)
        .filter((item) =>
          item.sections.some((res) =>
            res.resources.some((val) => val.resource._id == id)
          )
        )
        .map((item) => ({
          id: item._id,
          title: item.title,
          subTitle: 'course'
        })),
    [coursesResponse.items, id]
  )

  const [openDialog, setOpenDialog] = useState(false)
  const onCloseDialog = useCallback(() => setOpenDialog(false), [])

  const onSubmitButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (coursesFiltered.length > 0) {
        event.preventDefault()
        setOpenDialog(true)
      }
    },
    [coursesFiltered.length]
  )

  return {
    openDialog,
    onCloseDialog,
    coursesFiltered,
    onSubmitButtonClick
  }
}

export default useChangeConfirm
