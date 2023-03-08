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
      }
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['small', 'medium', 'large']
      }
    },
    reviews: {
      control: {
        type: 'number'
      }
    },
    withBackground: {
      control: {
        type: 'boolean'
      }
    },
    smallNumber: {
      control: {
        type: 'boolean'
      }
    },
    bigNumber: {
      control: {
        type: 'boolean'
      }
    },
    mobile: {
      control: {
        type: 'boolean'
      }
    },
    spacing: {
      control: {
        type: 'number'
      }
    }
  }
}

const Template = (args) => <AppRating { ...args } />

export const Default = Template.bind({})
Default.args = {
  value: 4.5,
  smallNumber: true,
  withBackground: true,
  spacing: 1,
  mobile: false,
  bigNumber: false,
}
