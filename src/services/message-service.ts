import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import { MessageInterface, RequestParams } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const messageService = {
  getMessages: (
    chatId: string,
    params?: Partial<Omit<RequestParams, 'sort'>>
  ): Promise<AxiosResponse<MessageInterface[]>> => {
    const chat = createUrlPath(URLs.chats.get, chatId)
    return axiosClient.get(`${chat}${URLs.messages.get}`, { params })
  }
}
