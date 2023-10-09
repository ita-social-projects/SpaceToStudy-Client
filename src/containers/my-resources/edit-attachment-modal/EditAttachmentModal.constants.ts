import { Attachment } from '~/types'
import { emptyField, textField } from '~/utils/validations/common'

export const getInitialValues = (attachment: Attachment) => {
  const initialFileName = attachment.fileName.substring(
    0,
    attachment.fileName.lastIndexOf('.')
  )

  return {
    fileName: initialFileName ?? '',
    category: attachment.category?._id ?? null,
    description: attachment.description ?? ''
  }
}

export const validations = {
  fileName: (value: string) =>
    emptyField(
      value,
      'common.errorMessages.emptyField',
      textField(5, 55)(value)
    ),
  description: textField(0, 150)
}
