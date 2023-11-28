import { Lesson, Quiz, Attachment, ItemsWithCount } from '~/types'
import { Course } from '~/types/course/interfaces/course.interface'

export type CourseResources = Lesson | Quiz | Attachment

export type MyCorsesListProps = Omit<ItemsWithCount<Course>, 'count'>
