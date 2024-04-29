import { FC } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { fileEditorConfig } from './FileEditor.constants'
import { useTranslation } from 'react-i18next'

interface FileEditorProps {
  onEdit: (content: string) => void
  value: string
}

const FileEditor: FC<FileEditorProps> = ({ onEdit, value }) => {
  const { t } = useTranslation()

  return (
    <Editor
      apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
      data-testid='editor'
      init={{
        height: 400,
        menubar: true,
        placeholder: t('lesson.fileEditorPlaceholder'),
        plugins: fileEditorConfig.plugins.join(' '),
        toolbar: fileEditorConfig.toolbar.join(' | '),
        content_style:
          '@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;800&display=swap"); body { font-family:Rubik; font-size:14px }',
        font_family_formats: Object.entries(fileEditorConfig.fonts)
          .map((entry) => entry.join('='))
          .join('; ')
      }}
      onEditorChange={onEdit}
      value={value}
    />
  )
}

export default FileEditor
