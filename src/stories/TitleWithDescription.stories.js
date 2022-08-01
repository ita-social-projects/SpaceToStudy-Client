import TitleWithDescription from '../components/title-with-description/TitleWithDescription'

export default {
  title: 'TitleWithDescription',
  component: TitleWithDescription,
  argTypes: {
    title: {
      type: 'string',
      description: 'Title value'
    },
    description: {
      type: 'string',
      description: 'Description value'
    },
    textWithDot: {
      type: 'string',
      description: 'TextWithDot value'
    },
    titleVariant: {
      type: 'string',
      description: 'Title font size',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: {
        type: 'radio'
      }
    },
    descriptionVariant: {
      type: 'string',
      description: 'Description font size',
      options: ['subtitle1', 'subtitle2', 'body1', 'body2'],
      control: {
        type: 'radio'
      }
    },
    textWithDotVariant: {
      type: 'string',
      description: 'TextWithDot font size',
      options: ['subtitle1', 'subtitle2', 'body1', 'body2'],
      control: {
        type: 'radio'
      }
    }
  }
}

const Template = (args) => <TitleWithDescription {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  title: 'Title',
  description: 'Description',
<<<<<<< HEAD
  titleStyles: { typography: 'h2' },
  descriptionStyles: { typography: 'subtitle1' }
=======
  textWithDot: 'TextWithDot',
  titleVariant: 'h2',
  descriptionVariant: 'subtitle1',
  textWithDotVariant: 'subtitle1'
>>>>>>> e7d47e3 (add privacy policy page)
}

export const Tablet = Template.bind({})

Tablet.args = {
  title: 'Title',
  description: 'Description',
<<<<<<< HEAD
  titleStyles: { typography: 'h3' },
  descriptionStyles: { typography: 'subtitle1' }
=======
  textWithDot: 'TextWithDot',
  titleVariant: 'h3',
  descriptionVariant: 'subtitle1',
  textWithDotVariant: 'subtitle1'
>>>>>>> e7d47e3 (add privacy policy page)
}

export const Mobile = Template.bind({})

Mobile.args = {
  title: 'Title',
  description: 'Description',
<<<<<<< HEAD
  titleStyles: { typography: 'h4' },
  descriptionStyles: { typography: 'subtitle2' }
=======
  textWithDot: 'TextWithDot',
  titleVariant: 'h4',
  descriptionVariant: 'subtitle2',
  textWithDotVariant: 'subtitle2'
>>>>>>> e7d47e3 (add privacy policy page)
}
