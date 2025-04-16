import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectNameInterface } from '~/types'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/get-full-url'
import type {
  CreateSubjectParams,
  SubjectInterface
} from '~/types/subject/interfaces/subject.interface'

export const subjectService = {
  getSubjects: (
    params: Pick<SubjectInterface, 'name'> & Record<'categoryId', string>
  ) => {
    const { categoryId, ...restParams } = params

    let resultUrl = getFullUrl({
      pathname: URLs.subjects.get,
      searchParameters: restParams
    })

    if (categoryId) {
      resultUrl = getFullUrl({
        pathname: URLs.subjects.getByCategoryId,
        parameters: { id: categoryId },
        searchParameters: restParams
      })
    }

    return baseService.request<ItemsWithCount<SubjectInterface>>({
      method: 'GET',
      url: resultUrl
    })
  },
  getSubjectsNames: (categoryId: string | null) => {
    let resultUrl = getFullUrl({
      pathname: URLs.subjects.getNames
    })

    if (categoryId) {
      resultUrl = getFullUrl({
        pathname: URLs.subjects.getNamesByCategoryId,
        parameters: { id: categoryId }
      })
    }

    return baseService.request<SubjectNameInterface[]>({
      method: 'GET',
      url: resultUrl
    })
  },
  createSubject: (data: CreateSubjectParams) => {
    return baseService.request<SubjectInterface>({
      method: 'POST',
      url: URLs.subjects.create,
      data
    })
  }
}
