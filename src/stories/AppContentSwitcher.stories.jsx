import { useState } from 'react'
import { action } from '@storybook/addon-actions'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

export default {
  component: AppContentSwitcher,
  title: 'AppContentSwitcher',
  argTypes: {
    handleChange:{
      action: 'handleChange',
      type:'function',
      description:'changes state that shows the content'
    },
    active:{
      type:'boolean',
      description:'the state that shows the content'
    },
    styles: {
      type: 'object',
      description: 'default styles for the component',
      defaultValue: { display: 'flex', flexDirection: 'row' }
    }
  }
}

const Template = (args) => {
  const [active, setActive] = useState(true)
  const handleChange = () => {
    setActive(!active)
    action('set new state')(active)
  }
  return (
    <AppContentSwitcher
      { ...args }
      active={ active }
      handleChange={ handleChange }
    />
  )
}

const switchOptions = {
  left: {
    text: 'left text',
    tooltip: 'left tooltip'
  },
  right: {
    text: 'right text',
    tooltip: 'right tooltip',
  }
}

export const Default = Template.bind({})
Default.args = {
  switchOptions: switchOptions,
  typographyVariant: 'h6',
}

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  switchOptions: switchOptions,
  typographyVariant: 'h6',
  styles: {
    flexDirection: 'column'
  }
}
