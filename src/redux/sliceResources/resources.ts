import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { appApi } from '~/redux/apiSlice'

import {
  ItemsWithCount,
  Lesson,
  LessonData,
  EditLessonArgs,
  LessonsQueryArgs,
  ApiMethodEnum
} from '~/types'

const { POST, PATCH, DELETE } = ApiMethodEnum

export const apiWithTag = appApi.enhanceEndpoints({
  addTagTypes: ['Lessons']
})

export const resourcesApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<ItemsWithCount<Lesson>, LessonsQueryArgs>({
      query: (params: LessonsQueryArgs) => ({
        url: createUrlPath(URLs.resources.lessons.get),
        params
      }),
      providesTags: ['Lessons']
    }),
    deleteLessonById: builder.mutation<void, string>({
      query: (id) => ({
        url: `${createUrlPath(URLs.resources.lessons.delete)}/${id}`,
        method: DELETE
      }),
      invalidatesTags: ['Lessons']
    }),
    addLesson: builder.mutation<Lesson, LessonData>({
      query: (data) => ({
        url: URLs.resources.lessons.add,
        method: POST,
        body: data
      }),
      invalidatesTags: ['Lessons']
    }),
    editLesson: builder.mutation<Lesson, EditLessonArgs>({
      query: (params) => ({
        url: createUrlPath(URLs.resources.lessons.patch, params.id),
        method: PATCH,
        body: params
      }),
      invalidatesTags: ['Lessons']
    })
  })
})

export const {
  useAddLessonMutation,
  useDeleteLessonByIdMutation,
  useGetLessonsQuery,
  useEditLessonMutation
} = resourcesApi
