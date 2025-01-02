import { Meta, StoryObj } from '@storybook/react'

import Alert from '~scss-components/alert/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "The `Alert` displays a short, important message in a way that attracts the user's attention without interrupting the user's task."
      }
    }
  },
  args: {
    variant: 'standard',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'success'
  },
  argTypes: {
    variant: {
      description: 'The variant to use.',
      control: 'radio',
      options: ['filled', 'outlined', 'standard']
    },
    label: {
      description: 'The label to display in the alert.',
      control: 'text'
    },
    title: {
      description: 'The title to display in the alert.',
      control: 'text'
    },
    description: {
      description: 'The description to display in the alert.',
      control: 'text'
    },
    severity: {
      description:
        'The severity of the alert. This defines the color and icon used.',
      control: 'radio',
      options: ['error', 'info', 'success', 'warning']
    },
    icon: {
      description:
        'Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the severity prop.'
    }
  }
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    label: 'Label',
    title: 'Title',
    description: 'Description'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays a default alert with the `standard` variant and `success` severity.'
      }
    }
  }
}

export const All: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.25rem',
        padding: '1rem',
        alignItems: 'start'
      }}
    >
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='error'
        title='Title'
        variant='filled'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='error'
        title='Title'
        variant='outlined'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='warning'
        title='Title'
        variant='filled'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='warning'
        title='Title'
        variant='outlined'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='info'
        title='Title'
        variant='filled'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='info'
        title='Title'
        variant='outlined'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='success'
        title='Title'
        variant='filled'
      />
      <Alert
        {...args}
        description='Description'
        label='Label'
        severity='success'
        title='Title'
        variant='outlined'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story showcases all alert variants in two columns for easy comparison.'
      }
    }
  }
}

export const FilledError: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'error'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `filled` variant and `error` severity. Use this style for critical error messages.'
      }
    }
  }
}

export const FilledWarning: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'warning'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `filled` variant and `warning` severity. Ideal for cautionary messages.'
      }
    }
  }
}

export const FilledInfo: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'info'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `filled` variant and `info` severity. Use this for informational messages.'
      }
    }
  }
}

export const FilledSuccess: Story = {
  args: {
    variant: 'filled',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'success'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `filled` variant and `success` severity. Use this for success confirmation messages.'
      }
    }
  }
}

export const OutlinedError: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'error'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `outlined` variant and `error` severity. Use this style for subtle but critical error messages.'
      }
    }
  }
}

export const OutlinedWarning: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'warning'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `outlined` variant and `warning` severity. Ideal for understated cautionary messages.'
      }
    }
  }
}

export const OutlinedInfo: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'info'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `outlined` variant and `info` severity. Use this for understated informational messages.'
      }
    }
  }
}

export const OutlinedSuccess: Story = {
  args: {
    variant: 'outlined',
    label: 'Label',
    title: 'Title',
    description: 'Description',
    severity: 'success'
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story displays an alert with the `outlined` variant and `success` severity. Use this for subtle success confirmation messages.'
      }
    }
  }
}
