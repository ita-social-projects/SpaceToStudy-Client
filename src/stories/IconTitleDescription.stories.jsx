import LanguageIcon from '@mui/icons-material/Language'
import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'

export default {
  title: 'IconTitleDescription',
  component: IconTitleDescription,
  argTypes: {
    icon: {
      type: { name: 'ReactNode' },
      description: 'Icon value'
    },
    title: {
      type: 'string',
      description: 'Title value'
    },
    description: {
      type: 'string',
      description: 'Description value'
    },
    sx: {
      type: 'object',
      description: 'Description styles'
    }
  }
}

const sx = {
  container: {
    textAlign: 'center'
  },
  titleWithDescription: {
    title: {
      typography: 'h6'
    }
  }
}

const Template = (args) => <IconTitleDescription {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  icon: <LanguageIcon fontSize='large' />,
  title: 'Language Title',
  description: 'Language Description',
  sx
}
