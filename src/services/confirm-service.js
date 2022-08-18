import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const confirmService = {

  getAll: () => {
    return axiosClient.get(URLs.confirm.get)
  }

}
