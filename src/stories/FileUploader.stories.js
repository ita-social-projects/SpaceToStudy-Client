import FileUploader from '~/components/file-uploader/FileUploader'
import useUpload from '~/hooks/use-upload'

export default {
  title: 'FileUploader',
  component: FileUploader,
  argTypes: {
    buttonText: {
      type: 'string',
      description: 'Button text'
    },
  }
}

export const Default = () => {
  const upload = useUpload({ maxQuantityFiles: 5 })
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto',  }}>
      <h1>File Uploader</h1>
      <FileUploader buttonText={ 'Upload your files' } upload={ upload } />
    </div> 
  )
}

Default.args = {}
