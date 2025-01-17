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

export const getChangedFields = (
  initialValues: EditAttachmentForm,
  currentValues: EditAttachmentForm
) => {
  const changedFields: Partial<
    Record<keyof EditAttachmentForm, string | null>
  > = {}

  Object.keys(initialValues).forEach((key) => {
    const initialValue = initialValues[key as keyof EditAttachmentForm]
    const currentValue = currentValues[key as keyof EditAttachmentForm]

    if (initialValue !== currentValue) {
      changedFields[key as keyof EditAttachmentForm] = currentValue
    }
  })

  return changedFields
}

export const validations = {
  fileName: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.emptyField',
      helperText: textField(5, 55)(value)
    }),
  description: textField(0, 150)
}
