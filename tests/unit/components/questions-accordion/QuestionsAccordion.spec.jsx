import { render, screen, fireEvent } from '@testing-library/react'
import QuestionsAccordion from '~/components/questions-accordion/QuestionsAccordion';

const items = [
    {
        title: 'title1',
        description: 'description1'
    },
    {
        title: 'title2',
        description: 'description2'
    }
]

const iconId = 'accordion-icon'

const firstAccordionSummaryId = 'accordion-summary-0'
const firstAccordionDescriptionId = 'accordion-description-0'

const mockedTitle = 'some-title'

describe('QuestionsAccordion component with icon test', () => {
    beforeEach(() => {
        render(<QuestionsAccordion items={items} showIcon={true} />)
    })

    it('Test headings', () => {
        const firstTitle = screen.getByText('title1')
        const secondTitle = screen.getByText('title2')

        expect(firstTitle).toBeVisible()
        expect(secondTitle).toBeVisible()
    })

    it('Test descriptions', () => {
        const firstDescription = screen.getByText('description1')
        const secondDescription = screen.getByText('description2')

        expect(firstDescription).toBeInTheDocument()
        expect(secondDescription).toBeInTheDocument()
    })


    it('should render icon', () => {
        const expandIcon = screen.queryAllByTestId(iconId)

        expect(expandIcon).toHaveLength(items.length)
    })

    it('should click on first accordion item and description be shown', () => {
        const accordionItem = screen.getByTestId(firstAccordionSummaryId)

        fireEvent.click(accordionItem)

        const description = screen.getByTestId(firstAccordionDescriptionId)

        expect(description).toBeVisible()
    })
})

describe('QuestionsAccordion component without title test', () => {

    beforeEach(() => {
        render(<QuestionsAccordion items={items} showIcon={true} title={mockedTitle} />)
    })

    it('should render with title', () => {
        const title = screen.getByText(mockedTitle)

        expect(title).toBeVisible()
    })
})

describe('QuestionsAccordion component without icon test', () => {
    beforeEach(() => {
        render(<QuestionsAccordion items={items} showIcon={false} title={mockedTitle} />)
    })

    it('should render without icon', () => {
        const icon = screen.queryAllByTestId(iconId)

        expect(icon).toHaveLength(0)
    })
})