import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { appApi } from '~/redux/apiSlice'

import { URLs } from '~/constants/request'
import {
  Attachment,
  GetResourcesParams,
  GetResourcesCategoriesParams,
  ItemsWithCount,
  LessonData,
  Lesson,
  UpdateAttachmentParams,
  Question,
  Categories,
  CreateQuestionData,
  CategoryNameInterface,
  UpdateResourceCategory,
  CreateCategoriesParams,
  UpdateQuestionParams,
  CreateQuizParams,
  Quiz,
  UpdateQuizParams,
  ApiMethodEnum,
  GetQuestion
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import { baseService } from '~/services/base-service'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  getUsersLessonsQuery: (params?: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Lesson>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.lessons.get,
        searchParameters: params
      })
    })
  },
  getLesson: async (id: string) => {
    return baseService.request<Lesson & { category: string | null }>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.lessons.getById,
        parameters: { id }
      })
    })
  },
  deleteLesson: async (id: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  addLesson: async (data: LessonData) => {
    return baseService.request<Lesson & { category: string | null }>({
      method: 'POST',
      url: URLs.resources.lessons.add,
      data
    })
  },
  editLesson: async (data: LessonData, id: string) => {
    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.resources.lessons.patch,
        parameters: { id }
      }),
      data
    })
  },
  getQuizzes: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Quiz>>> =>
    await axiosClient.get(URLs.quizzes.get, { params }),
  getQuizzesQuery: (params?: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Quiz>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.quizzes.get,
        searchParameters: params
      })
    })
  },
  getQuizQuery: async (id: string) => {
    return baseService.request<Quiz>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.quizzes.getById,
        parameters: { id }
      })
    })
  },
  getQuiz: async (id?: string): Promise<AxiosResponse<Quiz>> =>
    await axiosClient.get(createUrlPath(URLs.quizzes.get, id)),
  addQuiz: async (data?: CreateQuizParams): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.quizzes.add, data),
  editQuiz: async (params?: UpdateQuizParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.quizzes.patch, params?.id),
      params
    ),
  deleteQuiz: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.quizzes.delete, id)),
  getAttachments: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params }),
  getAttachmentsQuery: (params?: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Attachment>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.attachments.get,
        searchParameters: params
      })
    })
  },
  updateAttachment: async (params?: UpdateAttachmentParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.attachments.patch, params?.id),
      params
    ),
  deleteAttachment: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.attachments.delete, id)
    ),
  createAttachments: (data?: FormData): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.attachments.post, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getQuestions: (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Question>>> => {
    return axiosClient.get(URLs.resources.questions.get, { params })
  },
  getQuestionsQuery: (params?: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Question>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.questions.get,
        searchParameters: params
      })
    })
  },
  getQuestion: async (id?: string): Promise<AxiosResponse<GetQuestion>> =>
    await axiosClient.get(createUrlPath(URLs.resources.questions.get, id)),
  createQuestion: async (data?: CreateQuestionData): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.resources.questions.post, data)
  },
  updateQuestion: async (params?: UpdateQuestionParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.questions.patch, params?.id),
      params
    ),
  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),
  getResourcesCategories: (
    params?: GetResourcesCategoriesParams
  ): Promise<AxiosResponse<ItemsWithCount<Categories>>> => {
    return axiosClient.get(URLs.resources.resourcesCategories.get, { params })
  },
  getResourcesCategoriesNames: (): Promise<
    AxiosResponse<CategoryNameInterface[]>
  > => axiosClient.get(URLs.resources.resourcesCategories.getNames),
  createResourceCategory: async (
    params?: CreateCategoriesParams
  ): Promise<AxiosResponse<Categories>> =>
    await axiosClient.post(URLs.resources.resourcesCategories.post, params),
  deleteResourceCategory: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.resourcesCategories.delete, id)
    )
}

export const resourceService = appApi.injectEndpoints({
  endpoints: (build) => ({
    updateResourceCategory: build.mutation<void, UpdateResourceCategory>({
      query: (params) => ({
        url: createUrlPath(URLs.resources.resourcesCategories.patch, params.id),
        method: ApiMethodEnum.PATCH,
        body: { ...params }
      })
    })
  })
})

export const { useUpdateResourceCategoryMutation } = resourceService
