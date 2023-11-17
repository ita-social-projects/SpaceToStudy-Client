import { FC } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface FileEditorProps {
  onEdit: (content: string) => void
  value: string
}

const FileEditor: FC<FileEditorProps> = ({ onEdit, value }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
      data-testid='editor'
      init={{
        height: 400,
        menubar: true,
        plugins:
          'anchor accordion autolink autosave charmap codesample emoticons directionality help fullscreen preview pagebreak insertdatetime image link lists advlist media searchreplace table visualblocks wordcount code',
        toolbar:
          'undo redo | blocks fontsize | bold italic underline strikethrough | ltr rtl | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent accordion | removeformat',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      onEditorChange={onEdit}
      value={value}
    />
  )
}

export default FileEditor
