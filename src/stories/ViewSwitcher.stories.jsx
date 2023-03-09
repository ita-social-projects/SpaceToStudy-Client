import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

export default {
  title: 'ViewSwitcher',
  component: ViewSwitcher,
  argTypes: {
    setOffersView:{
      type:'function',
      description:'change offers card view'
    },
    offersView:{
      options: ['inline', 'grid'],
      control: { type: 'radio' },
      description:'offers view state'
    }
  }
}

const Template = (args) => <ViewSwitcher { ...args } />

export const Default = Template.bind({})

Default.args = {
  setOffersView: (view) => console.log('Updated view: ',view),
  offersView:'inline'
}
