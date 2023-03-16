import  AppRatingBig  from '~/components/app-rating-big/AppRatingBig'

export default {
  title: 'AppRatingBig',
  component: AppRatingBig,
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
    reviewsCount: {
      control: {
        type: 'number'
      },
      description: 'The number of reviews'
    },
    mobile: {
      control: {
        type: 'boolean'
      },
      description: 'Whether to display the component in mobile view'
    }
  }
}

const Template = (args) => <AppRatingBig { ...args } />

export const Default = Template.bind({})
Default.args = {
  value: 4.5,
  mobile: false,
  reviewsCount: 100
}
