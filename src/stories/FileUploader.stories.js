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
    maxQuantityFiles: {
      type: 'number',
      description: 'Max quantity files'
    },
    maxAllFilesSize: {
      type: 'number',
      description: 'Max all files size'
    },
    maxFileSize: {
      type: 'number',
      description: 'Max files size'
    },
    emitter: {
      type: 'function',
      description: 'Emiter function'
    },
    filesTypes: {
      type: 'array',
      description: 'Array of files types'
    }
  }
}

export const Default = (args) => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto',  }}>
      <h1>File Uploader</h1>
      <FileUploader { ...args }/>
    </div> 
  )
}

Default.args = {
  buttonText: 'Upload your files',
  emitter: () => console.log('emitter called'),
  initialState: [],
  initialError: null,
  emitter: () => '',
  maxQuantityFiles: 5,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000
}
