import { Attachment, EditAttachmentForm } from '~/types'
import { parseFileName } from '~/utils/helper-functions'
import { emptyField, textField } from '~/utils/validations/common'

export const getInitialValues = (
  attachment: Attachment
): EditAttachmentForm => {
  const { fileExtension, fileName } = parseFileName(attachment.fileName)

  return {
    fileName: fileName ?? '',
    category: attachment.category?._id ?? null,
    description: attachment.description ?? '',
    fileExtension: fileExtension ?? ''
  }
}

export const validations = {
  fileName: (value: string, data: EditAttachmentForm) => {
    const fileWithExtension = `${value}.${data.fileExtension}`
    return emptyField(
      fileWithExtension,
      'common.errorMessages.emptyField',
      textField(5, 55)(fileWithExtension)
    )
  },
  description: textField(0, 150)
}
