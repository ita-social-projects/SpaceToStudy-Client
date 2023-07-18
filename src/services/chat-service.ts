import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { ChatResponse } from '~/types'

export const chatService = {
  getChats: (): Promise<AxiosResponse<ChatResponse[]>> => {
    return axiosClient.get(URLs.chats.get)
  }
}
