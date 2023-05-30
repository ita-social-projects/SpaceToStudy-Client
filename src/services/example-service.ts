import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const exampleService = {
  getAll: () => {
    return axiosClient.get(URLs.example.get)
  }
}
