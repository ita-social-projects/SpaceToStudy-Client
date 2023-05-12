import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { CreateCooperationsParams } from '~/types'

export const cooperationService = {
  createCooperation: async (
    data: CreateCooperationsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.cooperations.create, data)
}
