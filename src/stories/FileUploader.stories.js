import FileUploader from '~/components/file-uploader/FileUploader'


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

const Template = (args) => <FileUploader {...args} />

export const Default = Template.bind({})

Default.args = {
    buttonText:"File Uploader"
}
