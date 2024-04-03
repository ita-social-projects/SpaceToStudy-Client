import FileUploader from '~/components/file-uploader/FileUploader'

export default {
  title: 'FileUploader',
  component: FileUploader,
  argTypes: {
    buttonText: {
      type: 'string',
      description: 'Button text'
    },
    initialState: {
      type: 'array',
      description: 'Initial state'
    },
    initialError: {
      type: 'string',
      description: 'Initial error'
    },
    emitter: {
      type: 'function',
      description: 'Emiter function'
    },
    validationData: {
      type: 'object',
      description: 'All validation data'
    }
  }
}

export const Default = (args) => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>File Uploader</h1>
      <FileUploader {...args} />
    </div>
  )
}

Default.args = {
  buttonText: 'Upload your files',
  emitter: () => console.log('emitter called'),
  initialState: [],
  initialError: '',
  validationData: {
    maxFileSize: 5_000_000,
    maxAllFilesSize: 20_000_000,
    filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    fileSizeError: 'File size error',
    allFilesSizeError: 'All files size error',
    typeError: 'Type error',
    maxQuantityFiles: 7
  }
}
