// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// this mock makes sure any components using the translate hook can use it without a warning being shown
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  },
}))

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    checkConfirmation: () => true
  })})
