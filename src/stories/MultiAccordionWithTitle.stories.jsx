import MultiAccordionWithTitle from '~/components/multi-accordion-with-title/MultiAccordionWIthTitle'


export default {
    title: 'MultiAccordionWithTitle',
    component: MultiAccordionWithTitle,
    argTypes: {
        title: {
            type: 'string',
            description: 'The title of accordion'
        },
        items: {
            type: 'array',
            description: 'Array of accordion items to show'
        },
        icon: {
            type: 'object',
            description: 'Icon for accordion'
        },
        sx: {
            type: 'object',
            description: 'Styles for accordion'
        }
    }
}

const Template = (args) => <MultiAccordionWithTitle {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
    title: 'Here is some title',
    items: [
        {
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            title: 'Title 2',
            description: 'Description 2'
        }
    ],
}
