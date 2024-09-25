import { useCallback, useState } from 'react'
import useAxios from './use-axios'
import {
  Cooperation,
  Course,
  GetCooperationsParams,
  GetCoursesParams,
  ItemsWithCount
} from '~/types'
import { CourseService } from '~/services/course-service'
import { cooperationService } from '~/services/cooperation-service'

const transformCourses =
  (subTitle: 'course' | 'cooperation') =>
  <T extends Course | Cooperation>(course: T) => ({
    id: course._id,
    title: course.title,
    subTitle
  })

const findCourseOrCooperationByResourceId = (id?: string) => {
  return <T extends Course | Cooperation>(item: T) => {
    if (!item.sections.length) {
      return false
    }

    return item.sections.some((res) =>
      res.resources.some((val) => val.resource._id == id)
    )
  }
}

const useChangeConfirm = (id: string | undefined) => {
  const [openDialog, setOpenDialog] = useState(false)
  const onCloseDialog = useCallback(() => setOpenDialog(false), [])

  const { response: coursesResponse } = useAxios<
    ItemsWithCount<Course>,
    GetCoursesParams
  >({
    service: CourseService.getCourses,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: true
  })

  const { response: cooperationsResponse } = useAxios<
    ItemsWithCount<Cooperation>,
    GetCooperationsParams
  >({
    service: cooperationService.getCooperations,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: true
  })

  const matchingCourses = coursesResponse.items
    .filter(findCourseOrCooperationByResourceId(id))
    .map(transformCourses('course'))

  const matchingCooperations = cooperationsResponse.items
    .filter(findCourseOrCooperationByResourceId(id))
    .map(transformCourses('cooperation'))

  const onSubmitButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (matchingCourses.length > 0) {
        event.preventDefault()
        setOpenDialog(true)
      }
    },
    [matchingCourses.length]
  )

  return {
    openDialog,
    onCloseDialog,
    coursesFiltered: [...matchingCourses, ...matchingCooperations],
    onSubmitButtonClick
  }
}

export default useChangeConfirm
