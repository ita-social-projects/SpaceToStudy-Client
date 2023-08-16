import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { initialFileValue } from '~/components/file-editor/FileEditor.constants'

const FileEditor = () => {
  const handleSave = (content: string) => {
    console.log('Saved content:', content)
  }

  return (
    <Editor
      apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
      data-testid='editor'
      init={{
        height: 400,
        menubar: true,
        plugins:
          'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss save',
        toolbar:
          'save undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        save_onsavecallback: handleSave
      }}
      initialValue={initialFileValue}
    />
  )
}

export default FileEditor
