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
const styles = {
  titleComp: {
    wrapper: {
      textAlign: 'center',
      mb: '32px'
    },
    title: {
      typography: {
        md: 'h2',
        sm: 'h2',
        xs: 'h4'
      },
      mb: '16px'
    },
    description: {
      typography: {
        md: 'subtitle1',
        sm: 'subtitle1',
        xs: 'subtitle2'
      }
    }
  }
}
const Template = (args) => <TitleWithDescription {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  title: 'Title',
  description: 'Description',
  style: styles.titleComp
}
