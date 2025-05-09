import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { getCooperationByIdMockResponse as cooperationMock } from '~tests/test-constants'
import { URLs } from '~/constants/request'
import { queryClient } from '~/plugins/queryClient'

import CooperationDetails from '~/containers/my-cooperations/cooperation-details/CooperationDetails'
import { afterEach, describe, vi } from 'vitest'

const cooperationID = cooperationMock._id

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useParams: () => ({
            id: cooperationID
        })
    }
})

const coopClosureMock = {
    ...cooperationMock,
    status: 'request to close',
    needAction: {
        role: 'tutor',
        type: 'waiting for approval',
        messages: [
            'Please confirm the price of 500 USD for the cooperation.',
            'The price is acceptable for me.'
        ]
    }
}

const acceptCoopClosureMockWfAns = {
    ...cooperationMock,
    status: 'request to close',
    needAction: {
        role: 'tutor',
        type: 'waiting for answer',
        messages: []
    }
}

const acceptCoopClosureMockWfAppr = {
    ...cooperationMock,
    status: 'request to close',
    needAction: {
        role: 'tutor',
        type: 'waiting for approval',
        messages: [
            'Please confirm the price of 500 USD for the cooperation.',
            'The price is acceptable for me.'
        ]
    }
}

const mockStateTutor = {
    appMain: { userId: cooperationMock.initiator._id, userRole: 'tutor' }
}

const mockStateStudent = {
    appMain: { userId: cooperationMock.receiver._id, userRole: 'student' }
}

vi.mock(
    '~/containers/my-cooperations/cooperation-notes/CooperationNotes',
    () => ({
        default: function () {
            return <div>Cooperation Notes</div>
        }
    })
)

describe('CooperationDetails', () => {
    beforeAll(() => {
        mockAxiosClient
            .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
            .reply(200, cooperationMock)
    })

    beforeEach(() => {
        renderWithProviders(<CooperationDetails />, {
            preloadedState: mockStateTutor
        })
    })

    afterAll(() => {
        mockAxiosClient.reset()
    })

    it('should render details page', async () => {
        const notesButton = await screen.findByText(
            'cooperationsPage.details.notes'
        )

        expect(notesButton).toBeInTheDocument()
    })

    it('should show cooperation status and title', () => {
        const title = screen.getByText(cooperationMock.title)
        const statusChip = screen.getByText(cooperationMock.status)

        expect(title).toBeInTheDocument()
        expect(statusChip).toBeInTheDocument()
    })

    it('should render the component with tabs', () => {
        const tab1 = screen.getByText('cooperationsPage.tabs.activities')

        expect(tab1).toBeInTheDocument()

        const tab2 = screen.getByText('cooperationsPage.tabs.details')

        fireEvent.click(tab2)

        expect(tab2).toBeInTheDocument()
    })

    it('should toggle notes block', async () => {
        const notes = await screen.findByRole('button', {
            name: 'cooperationsPage.details.notes'
        })

        fireEvent.click(notes)

        let cooperationNotes = screen.queryByText('Cooperation Notes')

        expect(cooperationNotes).toBeInTheDocument()

        fireEvent.click(notes)

        cooperationNotes = screen.queryByText('Cooperation Notes')

        expect(cooperationNotes).not.toBeInTheDocument()
    })
})

describe('CooperationDetails with AcceptCooperationClosing modal', () => {
    beforeAll(() => {
        mockAxiosClient.reset()
        mockAxiosClient
            .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
            .reply(200, acceptCoopClosureMockWfAppr)
    })

    beforeEach(() => {
        renderWithProviders(<CooperationDetails />, {
            preloadedState: mockStateTutor
        })
    })

    it('should render AcceptCooperationClosing modal when needAction type is "waiting for approval" and role equals users role', async () => {
        const cooperationClosingModal = await screen.findByText(
            'titles.acceptCooperationClosing'
        )
        expect(cooperationClosingModal).toBeInTheDocument()
    })
})

describe('AcceptCooperationClosing modal with submitted answer', () => {
    beforeAll(() => {
        mockAxiosClient.reset()
        mockAxiosClient
            .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
            .reply(200, acceptCoopClosureMockWfAns)
    })

    beforeEach(() => {
        renderWithProviders(<CooperationDetails />, {
            preloadedState: mockStateTutor
        })
    })

    it('should render AcceptCooperationClosing modal when needAction type is "waiting for answer" and role is not the same as users role', async () => {
        const cooperationClosingModal = screen.getByText(
            'titles.acceptCooperationClosing'
        )
        expect(cooperationClosingModal).toBeInTheDocument()
    })
})

describe('CooperationClosureDeclinedBanner without answer being submitted', () => {
    beforeAll(() => {
        mockAxiosClient.reset()
        mockAxiosClient
            .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
            .reply(200, coopClosureMock)
    })

    beforeEach(() => {
        renderWithProviders(<CooperationDetails />, {
            preloadedState: mockStateStudent
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should render CooperationClosureDeclinedBanner when needAction type is "waiting for answer" and role equals users role', async () => {
        const cooperationClosingModal = await screen.findByText(
            'titles.cooperationClosureDeclined'
        )
        expect(cooperationClosingModal).toBeInTheDocument()
    })
    it('should render CooperationClosureDeclinedBanner when needAction type is "waiting for approval" and role is not the same as users role', async () => {
        const cooperationClosingModal = await screen.findByText(
            'titles.cooperationClosureDeclined'
        )
        expect(cooperationClosingModal).toBeInTheDocument()
    })
})
