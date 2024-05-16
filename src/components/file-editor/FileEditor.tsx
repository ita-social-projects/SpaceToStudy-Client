import { FC } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { getEditorInitOptions } from '~/components/file-editor/FileEditor.constants'
import { useTranslation } from 'react-i18next'

interface FileEditorProps {
  onEdit: (content: string) => void
  value: string
}

const FileEditor: FC<FileEditorProps> = ({ onEdit, value }) => {
  const { t } = useTranslation()

  const initOptions = getEditorInitOptions({
    placeholder: t('lesson.fileEditorPlaceholder')
  })

  return (
    <Editor
      apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
      data-testid='editor'
      init={initOptions}
      onEditorChange={onEdit}
      value={value}
    />
  )
}

export default FileEditor
