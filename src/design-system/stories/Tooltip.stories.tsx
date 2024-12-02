import type { Meta, StoryObj } from '@storybook/react'
import ToolTip from '~scss-components/tooltip/Tooltip'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'

const meta: Meta<typeof ToolTip> = {
  title: 'Components/Tooltip',
  component: ToolTip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **Tooltip** component is used to display additional information when users hover over or focus on a specific element. It supports:

- **Variants**:
  - \`icon\`: Displays a tooltip for an icon.
  - \`text\`: Displays a tooltip for text.
  - \`icon-text\`: Combines an icon and text in the tooltip.

- **Positions**:
  - \`up\`: Displays the tooltip above the target element.
  - \`down\`: Displays the tooltip below the target element.
  - \`right\`: Displays the tooltip to the right of the target element.
  - \`left\`: Displays the tooltip to the left of the target element.

### Usage Example
\`\`\`jsx
<ToolTip
  variant="icon-text"
  title="Tooltip Title"
  description="Tooltip Description"
  position="right"
/>
\`\`\`
      `
      }
    }
  },
  argTypes: {
    description: {
      control: { type: 'text' },
      description: 'An optional detailed description for the tooltip.'
    },
    position: {
      options: ['up', 'down', 'right', 'left', 'none'],
      control: { type: 'radio' },
      description:
        'Specifies the position of the tooltip relative to the target element.'
    },
    title: {
      control: { type: 'text' },
      description: 'The main text displayed in the tooltip.'
    },
    variant: {
      options: ['icon', 'text', 'icon-text'],
      control: { type: 'radio' },
      description:
        'Defines the variant of the tooltip (icon, text, or a combination of both).'
    }
  },
  args: {
    description: 'Optional description',
    title: 'Tooltip Title',
    variant: 'text',
    position: 'none'
  }
}

export default meta
type Story = StoryObj<typeof ToolTip>

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '20px' }}>
      <ToolTip
        {...args}
        icon={<GppMaybeIcon />}
        position='up'
        title='Icon Tooltip (Exclamation)'
        variant='icon'
      />
      <ToolTip
        {...args}
        description='Description for text tooltip.'
        position='down'
        title='Text Tooltip'
        variant='text'
      />
      <ToolTip
        {...args}
        description='Combines icon (Exclamation) and text.'
        icon={<GppMaybeIcon />}
        position='right'
        title='Icon & Text Tooltip Right'
        variant='icon-text'
      />
      <ToolTip
        {...args}
        description='Tooltip positioned to the left.'
        position='left'
        title='Text Tooltip Left'
        variant='text'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Displays all tooltip variants (`icon`, `text`, `icon-text`) with different positions (`up`, `down`, `right`, `left`) for a comprehensive demonstration. Includes custom icons (e.g., exclamation mark).'
      }
    }
  }
}

export const IconUp: Story = {
  args: {
    position: 'up',
    title: 'Icon Tooltip (Up)',
    variant: 'icon'
  },
  parameters: {
    docs: {
      description: {
        story: 'An **icon** tooltip positioned above the target element.'
      }
    }
  }
}

export const IconDown: Story = {
  args: {
    position: 'down',
    title: 'Icon Tooltip (Down)',
    variant: 'icon'
  },
  parameters: {
    docs: {
      description: {
        story: 'An **icon** tooltip positioned below the target element.'
      }
    }
  }
}

export const IconRight: Story = {
  args: {
    position: 'right',
    title: 'Icon Tooltip (Right)',
    variant: 'icon'
  },
  parameters: {
    docs: {
      description: {
        story:
          'An **icon** tooltip positioned to the right of the target element.'
      }
    }
  }
}

export const IconLeft: Story = {
  args: {
    position: 'left',
    title: 'Icon Tooltip (Left)',
    variant: 'icon'
  },
  parameters: {
    docs: {
      description: {
        story:
          'An **icon** tooltip positioned to the left of the target element.'
      }
    }
  }
}

export const TextUp: Story = {
  args: {
    position: 'up',
    title: 'Text Tooltip (Up)',
    description: 'Tooltip positioned at the top.',
    variant: 'text'
  },
  parameters: {
    docs: {
      description: {
        story: 'A **text** tooltip positioned above the target element.'
      }
    }
  }
}

export const TextDown: Story = {
  args: {
    position: 'down',
    title: 'Text Tooltip (Down)',
    description: 'Tooltip positioned at the bottom.',
    variant: 'text'
  },
  parameters: {
    docs: {
      description: {
        story: 'A **text** tooltip positioned below the target element.'
      }
    }
  }
}

export const TextRight: Story = {
  args: {
    position: 'right',
    title: 'Text Tooltip (Right)',
    description: 'Tooltip positioned to the right.',
    variant: 'text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **text** tooltip positioned to the right of the target element.'
      }
    }
  }
}

export const TextLeft: Story = {
  args: {
    position: 'left',
    title: 'Text Tooltip (Left)',
    description: 'Tooltip positioned to the left.',
    variant: 'text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **text** tooltip positioned to the left of the target element.'
      }
    }
  }
}

export const IconTextUp: Story = {
  args: {
    position: 'up',
    title: 'Icon & Text Tooltip (Up)',
    description: 'Combines icon and text at the top.',
    variant: 'icon-text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **combined icon and text** tooltip positioned above the target element.'
      }
    }
  }
}

export const IconTextDown: Story = {
  args: {
    position: 'down',
    title: 'Icon & Text Tooltip (Down)',
    description: 'Combines icon and text at the bottom.',
    variant: 'icon-text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **combined icon and text** tooltip positioned below the target element.'
      }
    }
  }
}

export const IconTextRight: Story = {
  args: {
    position: 'right',
    title: 'Icon & Text Tooltip (Right)',
    description: 'Combines icon and text to the right.',
    variant: 'icon-text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **combined icon and text** tooltip positioned to the right of the target element.'
      }
    }
  }
}

export const IconTextLeft: Story = {
  args: {
    position: 'left',
    title: 'Icon & Text Tooltip (Left)',
    description: 'Combines icon and text to the left.',
    variant: 'icon-text'
  },
  parameters: {
    docs: {
      description: {
        story:
          'A **combined icon and text** tooltip positioned to the left of the target element.'
      }
    }
  }
}
