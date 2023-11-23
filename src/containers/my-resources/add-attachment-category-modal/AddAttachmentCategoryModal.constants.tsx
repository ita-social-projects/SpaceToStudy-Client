import { Attachment } from '~/types'

export const getInitialValues = (attachment: Attachment) => {
  const initialFileName = attachment.fileName.substring(
    0,
    attachment.fileName.lastIndexOf('.')
  )

  return {
    id: attachment._id,
    fileName: initialFileName ?? '',
    category: null,
    description: attachment.description ?? ''
  }
}
