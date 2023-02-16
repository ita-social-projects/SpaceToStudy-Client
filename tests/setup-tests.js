import '@testing-library/jest-dom'
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))

const fetchMock = createFetchMock(vi)
fetchMock.enableMocks()
