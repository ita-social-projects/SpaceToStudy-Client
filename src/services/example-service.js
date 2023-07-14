import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'

export const exampleService = {
  getAll: () => {
    return axiosClient.get(URLs.example.get)
  }
}
