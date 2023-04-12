import AppRating from '~/components/app-rating/AppRating'

export default {
  title: 'AppRating',
  component: AppRating,
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 0.1
      },
      description: 'The rating value, ranging from 1 to 5 with a step of 0.1'
    },
    showNumber: {
      control: {
        type: 'boolean'
      },
      description: 'Whether to show the rating value or not'
    },
    sx: {
      control: null,
      description: 'The style props of the component'
    },
    precision: {
      control: 'number',
      description: 'The step of the rating component'
    }
  }
}

const Template = (args) => <AppRating {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 4.5,
  showNumber: true,
  precision: 0.1,
  sx: {
    backgroundColor: 'primary.50'
  }
}
