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
    titleStyles: {
      type: 'object',
      description: 'Title styles'
    },
    descriptionStyles: {
      type: 'object',
      description: 'Description styles'
    }
  }
}

const Template = (args) => <TitleWithDescription { ...args } />

export const Desktop = Template.bind({})

Desktop.args = {
  title: 'Title',
  description: 'Description',
  titleStyles: { typography: 'h2' },
  descriptionStyles: { typography: 'subtitle1' }
}

export const Tablet = Template.bind({})

Tablet.args = {
  title: 'Title',
  description: 'Description',
  titleStyles: { typography: 'h3' },
  descriptionStyles: { typography: 'subtitle1' }
}

export const Mobile = Template.bind({})

Mobile.args = {
  title: 'Title',
  description: 'Description',
  titleStyles: { typography: 'h4' },
  descriptionStyles: { typography: 'subtitle2' }
}
