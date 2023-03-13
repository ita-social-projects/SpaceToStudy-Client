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
      description: 'The rating value, ranging from 1 to 5 with a step of 0.1',
    },
    reviews: {
      control: {
        type: 'number'
      },
      description: 'The number of reviews',
    },
    numberVariant:{
      control: {
        type: 'inline-radio',
        options: ['big', 'small', '']
      },
      description: 'The variant of the number of reviews, either big or small'
    },
    mobile: {
      control: {
        type: 'boolean'
      },
      description: 'Whether to display the component in mobile view'
    },
    sx: {
      control: null,
      description: 'The style props of the component'
    },
  }
}

const Template = (args) => <AppRating { ...args } />

export const Default = Template.bind({})
Default.args = {
  value: 4.5,
  mobile: false,
  sx:{
    root:{ backgroundColor:'primary.50' },
    stars: {
      '& .MuiRating-icon': {
        mx: '1px'
      }
    },
  },
  numberVariant:''
}
