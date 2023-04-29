import { render, screen, fireEvent } from '@testing-library/react'
import React, { useState as useStateMock } from 'react';
import { vi } from 'vitest';
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

const mockedTitle = 'some-title'

const iconId = 'accordion-icon'

describe('QuestionsAccordion component with title test', () => {
    beforeEach(() => {
        render(<QuestionsAccordion items={items} title={mockedTitle} />)
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

    it('should render with title', () => {
        const title = screen.getByText(mockedTitle)

        expect(title).toBeVisible()
    })

    it('should render icon', () => {
        const icon = screen.getAllByTestId(iconId)

        expect(icon).toHaveLength(2)
    })
})

describe('QuestionsAccordion component without title test', () => {

    beforeEach(() => {
        render(<QuestionsAccordion items={items} icon={true} title={mockedTitle} />)
    })

    it('should add index of active accordion', () => {
        const firstAccordion = screen.getByTestId('accordion-title-0')

        fireEvent.click(firstAccordion)

        const firstAccordionDescription = screen.getByTestId('accordion-description-0')

        expect(firstAccordionDescription).toBeVisible()
    })

    it('should render with title', () => {
        const title = screen.getByText(mockedTitle)

        expect(title).toBeVisible()
    })
})
