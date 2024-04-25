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
          '@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;800&display=swap"); body { font-family:Rubik; font-size:14px }',
        font_family_formats:
          'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; Rubik=rubik'
      }}
      onEditorChange={onEdit}
      value={value}
    />
  )
}

export default FileEditor
