import { Attachment } from '~/types'

export const getInitialValues = (attachment: Attachment) => {
  return {
    id: attachment._id,
    category: null
  }
}
