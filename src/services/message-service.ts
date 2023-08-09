import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import { MessageInterface, GetMessagesParams, SendMessageParams } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const messageService = {
  getMessages: (
    params?: GetMessagesParams
  ): Promise<AxiosResponse<MessageInterface[]>> => {
    const chat = createUrlPath(URLs.chats.get, params?.chatId)
    return axiosClient.get(`${chat}${URLs.messages.get}`, { params })
  },
  sendMessage: (params: SendMessageParams): Promise<AxiosResponse> => {
    const chat = createUrlPath(URLs.chats.get, params.chatId)
    return axiosClient.post(`${chat}${URLs.messages.post}`, params)
  }
}
