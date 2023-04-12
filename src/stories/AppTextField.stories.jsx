import AppTextField from '~/components/app-text-field/AppTextField'

export default {
  title: 'AppTextField',
  component: AppTextField,
  argTypes: {
    errorMsg: {
      type: 'string',
      description: 'If passed, error message is shown'
    }
  },
  parameters: {
    componentSubtitle: (
      <a
        href='https://design-system.aurora.io/?path=/story/material-ui-textfield-including-select--basic'
        rel='noreferrer'
        target='_blank'
      >
        Full API
      </a>
    )
  }
}

const Template = (args) => <AppTextField {...args} />

export const AppTextFieldWithError = Template.bind({})

AppTextFieldWithError.args = {
  errorMsg: 'This field cannot be empty'
}
