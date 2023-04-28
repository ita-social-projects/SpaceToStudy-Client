import QuestionsAccordion from '~/components/questions-accordion/QuestionsAccordion';

export default {
    title: 'QuestionsAccordion',
    component: QuestionsAccordion,
    argTypes: {
        title: {
            type: 'string',
            description: 'The title of accordion'
        },
        showIcon: {
            type: 'boolean',
            description: 'If true, rounded show an arrow icon'
        },
        items: {
            type: 'array',
            description: 'Array of accordion items to show'
        },
    }
}

const Template = (args) => <QuestionsAccordion {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
    title: 'Here is some title',
    showIcon: true,
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
