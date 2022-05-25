import { request } from '~/plugins/request'
import { URLs } from '~/constants/request'

export const exampleService = {
  getAll: () => {
    return request.get(URLs.example.get)
  }
}
