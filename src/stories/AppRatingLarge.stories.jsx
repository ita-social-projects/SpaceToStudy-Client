import AppRatingLarge from '~/components/app-rating-large/AppRatingLarge'

export default {
  title: 'AppRatingBig',
  component: AppRatingLarge,
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
    }
  }
}

const Template = (args) => <AppRatingLarge {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 4.5,
  reviewsCount: 100
}
