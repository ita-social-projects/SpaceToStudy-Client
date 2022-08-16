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
    validation: {
      type: 'function',
      description: 'Validation function'
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
  validation: () => '',
  maxQuantityFiles: 5
}


export const WithError = (args) => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto',  }}>
      <h1>File Uploader with error</h1>
      <FileUploader { ...args } />
    </div> 
  )
}
WithError.args = {
  buttonText: 'Upload your files',
  emitter: () => console.log('emitter called'),
  initialState: [],
  initialError: 'Defauld error',
  validation: () => 'Validation error',
  maxQuantityFiles: 5
}
