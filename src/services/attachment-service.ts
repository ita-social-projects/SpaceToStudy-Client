import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { GetAttachmentsParams } from '~/types'

export const attachmentService = {
  getAttachments: async (
    params: GetAttachmentsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.resources.attachments.get, { params }),
    
  createAttachments: (data?: FormData): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.attachments.post, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
