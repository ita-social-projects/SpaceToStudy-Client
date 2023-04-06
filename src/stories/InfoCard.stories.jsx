import InfoCard from '~/components/info-card/InfoCard'
import logo from '~/assets/logo.svg'

export default {
  title: 'InfoCard',
  component: InfoCard,
  argTypes: {
    img: {
      type: 'string',
      description: 'Image link'
    },
    title: {
      type: 'string',
      description: 'Title value'
    },
    description: {
      type: 'string',
      description: 'Description value'
    },
    actionLabel: {
      type: 'string',
      description: 'Action label'
    },
    cardWidth: {
      type: 'string',
      description: 'Component width'
    },
    action: {
      type: 'function',
      description: 'Function that is called on button click '
    }
  }
}

const Template = (args) => <InfoCard {...args} />

export const Default = Template.bind({})

Default.args = {
  img: logo,
  title: 'Title',
  description: 'Description',
  actionLabel: 'Action label',
  cardWidth: '600px',
  action: () => alert('Action is triggered')
}
