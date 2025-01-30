import type {
  Attachment,
  CooperationSliceAttachment,
  EditAttachmentForm
} from '~/types'
import { parseFileName } from '~/utils/helper-functions'
import { emptyField, textField } from '~/utils/validations/common'

export const getInitialValues = (
  attachment: Attachment | CooperationSliceAttachment
): EditAttachmentForm => {
  const { fileExtension, fileName } = parseFileName(attachment.fileName)

  const category =
    typeof attachment.category === 'string'
      ? attachment.category
      : attachment.category?._id

  return {
    fileName: fileName ?? '',
    category: category ?? null,
    description: attachment.description ?? '',
    fileExtension: fileExtension ?? ''
  }
}

export const getChangedAttachmentFields = (
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
