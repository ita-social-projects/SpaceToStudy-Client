import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { appApi } from '~/redux/apiSlice'

import { URLs } from '~/constants/request'
import {
  Attachment,
  GetResourcesParams,
  type GetResourcesCategoriesParams,
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
  type CreateFinishedQuizParams,
  type UpdateFinishedQuizParams,
  Quiz,
  UpdateQuizParams,
  ApiMethodEnum,
  GetQuestion,
  type FinishedQuiz,
  type FinishedAttempts
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
  getQuiz: (id: string) => {
    return baseService.request<Quiz>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.quizzes.getById,
        parameters: { id }
      })
    })
  },
  addQuiz: (data: CreateQuizParams) => {
    return baseService.request<Quiz>({
      method: 'POST',
      url: URLs.quizzes.add,
      data
    })
  },
  editQuiz: (data: UpdateQuizParams) => {
    const { id, ...quizData } = data

    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.quizzes.patch,
        parameters: { id }
      }),
      data: quizData
    })
  },
  deleteQuiz: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.quizzes.delete, id)),
  addFinishedQuiz: async (data: CreateFinishedQuizParams) => {
    return baseService.request<FinishedQuiz>({
      method: 'POST',
      url: URLs.finishedQuizzes.add,
      data
    })
  },
  editFinishedQuiz: (id: string, data: UpdateFinishedQuizParams) => {
    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.finishedQuizzes.patch,
        parameters: { id }
      }),
      data
    })
  },
  getFinishedQuiz: async (id: string) => {
    return baseService.request<FinishedQuiz>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.finishedQuizzes.getById,
        parameters: { id }
      })
    })
  },
  getFinishedQuizzesByQuizId: (cooperationId: string, quizId: string) => {
    return baseService.request<FinishedAttempts>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.finishedQuizzes.getByQuizId,
        parameters: { cooperationId, quizId }
      })
    })
  },
  getAttachments: (params: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Attachment>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.attachments.get,
        searchParameters: params
      })
    })
  },
  updateAttachment: (data: UpdateAttachmentParams) => {
    const { id, ...attachmentData } = data

    return baseService.request<Attachment>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.resources.attachments.patch,
        parameters: { id }
      }),
      data: attachmentData
    })
  },
  deleteAttachment: async (id: string): Promise<AxiosResponse> => {
    return await axiosClient.delete(
      createUrlPath(URLs.resources.attachments.delete, id)
    )
  },
  createAttachment: (data: FormData) => {
    return baseService.request<Attachment>({
      method: 'POST',
      url: URLs.resources.attachments.post,
      data
    })
  },

  getQuestions: (params?: GetResourcesParams) => {
    return baseService.request<ItemsWithCount<Question>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.questions.get,
        searchParameters: params
      })
    })
  },

  getQuestion: (id: string) => {
    return baseService.request<GetQuestion>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.questions.getById,
        parameters: { id }
      })
    })
  },

  createQuestion: (data: CreateQuestionData) => {
    return baseService.request<Question>({
      method: 'POST',
      url: URLs.resources.questions.post,
      data
    })
  },

  updateQuestion: (data: UpdateQuestionParams) => {
    const { id, ...questionData } = data

    return baseService.request<Question>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.resources.questions.patch,
        parameters: { id }
      }),
      data: questionData
    })
  },

  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),
  getResourcesCategories: (params: GetResourcesCategoriesParams) => {
    return baseService.request<ItemsWithCount<Categories>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.resources.resourcesCategories.get,
        searchParameters: params
      })
    })
  },
  getResourcesCategoriesNames: () => {
    return baseService.request<CategoryNameInterface[]>({
      method: 'GET',
      url: URLs.resources.resourcesCategories.getNames
    })
  },
  createResourceCategory: (params: CreateCategoriesParams) => {
    return baseService.request<Categories>({
      method: 'POST',
      url: URLs.resources.resourcesCategories.post,
      data: params
    })
  },
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
