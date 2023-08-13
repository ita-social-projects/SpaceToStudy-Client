import { AxiosResponse } from 'axios'
import { GetAttachmentsParams } from '~/types'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const attachmentService = {
  getAttachments: async (
    params: GetAttachmentsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.resources.attachments.get, { params })
}
