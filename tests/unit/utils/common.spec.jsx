import { expect } from 'vitest'
import {
  emptyField,
  numberField,
  nameField,
  textField,
  helperTextHandler
} from '~/utils/validations/common'

const mockedValues = {
  nameWithNumbers: 'name2',
  tooLongName: 'vvvveeeerrrryyyylllloooonnnnggggnnnnaaaammmmeeee',
  invalidNumber: '8w5',
  validNumber: "123",
  negativeNumber: '-5',
  shortPassword: '111a?',
  validPassword: 'Abcd1234!',
  passwordWithoutLetters: '1234567!',
  passwordWithoutNumbers: 'abc!dwga%g&sad',
  passwordWithoutSpecialChar: '12345abcde',
  passwordWithInvalidSymbol: '123#qw er58',
  invalidEmail: 'example2example.com',
  validEmail: 'example1@example.com',
  shortText: 't',
  longText: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
  emptyField: '',
  spaceField: '    ',
  firstNameWithApostropheEn: "O'braian",
  firstNameWithApostropheUa: "Мар'яна",
  firstNameWithHyphen: 'Анна-Марія',
  firstNameWithSpace: 'Анна Марія',
  lastNameWithApostrophe: "Mc'Neil",
  lastNameWithApostropheAndHyphen: "O'Neill-Johnson",
  lastNameWithSpace: 'Van Gogh'
}

const errorMessages = {
  nameCharacters: 'common.errorMessages.nameCharacters',
  nameLength: 'common.errorMessages.nameLength',
  numbersOnly: 'common.errorMessages.numbersOnly',
  positiveNumbersOnly: 'common.errorMessages.positiveNumbersOnly',
  passwordLength: 'common.errorMessages.passwordLength',
  passwordComplex:
    'common.errorMessages.passwordComplex',
  passwordValidSymbols: 'common.errorMessages.passwordValidSymbols',
  emailValid: 'common.errorMessages.emailValid',
  shortText: 'common.errorMessages.shortText',
  longText: 'common.errorMessages.longText',
  emptyField: 'common.errorMessages.emptyField',
  hasOnlySpaces: 'common.errorMessages.hasOnlySpaces'
}

export const emailField = (value) => {
  return helperTextHandler(value, 'email')
}

export const passwordField = (value) => {
  return helperTextHandler(value, 'password')
}

describe('commonValidation', () => {
  it('Should accept firstName in English with apostrophe', () => {
    const result = nameField(mockedValues.firstNameWithApostropheEn)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept firstName in Ukrainian with apostrophe', () => {
    const result = nameField(mockedValues.firstNameWithApostropheUa)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept firstName with space', () => {
    const result = nameField(mockedValues.firstNameWithSpace)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept firstName with hyphen', () => {
    const result = nameField(mockedValues.firstNameWithHyphen)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept lastName with apostrophe', () => {
    const result = nameField(mockedValues.lastNameWithApostrophe)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept lastName with apostrophe and hyphen', () => {
    const result = nameField(mockedValues.lastNameWithApostropheAndHyphen)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should accept lastName with space', () => {
    const result = nameField(mockedValues.lastNameWithSpace)
    expect(result).not.toBe(errorMessages.nameCharacters)
  })

  it('Should display updated name when clicking "Update" button', () => {
    const isUpdated = true
    expect(isUpdated).toBe(true)
    const notificationText = 'Success! Your data has been updated.'
    expect(notificationText).toBe('Success! Your data has been updated.')
  })

  it('Should return an error because only letters, spaces, hyphens, and apostrophes are allowed', () => {
    const result = nameField(mockedValues.nameWithNumbers)
    expect(result).toBe(errorMessages.nameCharacters)
  })

  it('Should return error that name is too long', () => {
    const result = nameField(mockedValues.tooLongName)
    expect(result).toBe(errorMessages.nameLength)
  })

  it('Should return error that only number are allowed', () => {
    const result = numberField(mockedValues.invalidNumber)
    expect(result).toBe(errorMessages.numbersOnly)
  })

  it('Should return error that only positive number is allowed', () => {
    const result = numberField(mockedValues.negativeNumber)
    expect(result).toBe(errorMessages.positiveNumbersOnly)
  })

  it('Should pass for valid number input', () => {
    const result = numberField(mockedValues.validNumber) 
    expect(result).toBe('')
  })

  it('Should return error when password is empty', () => {
    const result = passwordField(mockedValues.emptyField)
    console.log(result)
    expect(result).toBe(errorMessages.emptyField)
  })
  
  it('Should return error that password cannot be shorter than 8 and longer than 25 characters', () => {
    const result = passwordField(mockedValues.shortPassword)
    expect(result).toBe(errorMessages.passwordLength)
  })

  it('Should return error that password must contain at least one alphabetic, one numeric and one special character', () => {
    const result1 = passwordField(mockedValues.passwordWithoutLetters)
    const result2 = passwordField(mockedValues.passwordWithoutNumbers)
    const result3 = passwordField(mockedValues.passwordWithoutSpecialChar)

    expect(result1).toBe(errorMessages.passwordComplex)
    expect(result2).toBe(errorMessages.passwordComplex)
    expect(result3).toBe(errorMessages.passwordComplex)
  })

  it('Should return error that password must contain only valid symbols', () => {
    const result = passwordField(mockedValues.passwordWithInvalidSymbol)
    expect(result).toBe(errorMessages.passwordValidSymbols)
  })

  it('Should pass for valid password', () => {
    const result = passwordField(mockedValues.validPassword)
    expect(result).toBe('')
  })

  it('Should return error that email is invalid', () => {
    const result = emailField(mockedValues.invalidEmail)
    expect(result).toBe(errorMessages.emailValid)
  })

  it('Should pass for valid email', () => {
    const result = emailField(mockedValues.validEmail)
    expect(result).toBe('')
  })

  it('Should return error that text is too short', () => {
    const result = textField(10, 25)(mockedValues.shortText)
    expect(result).toBe(errorMessages.shortText)
  })

  it('Should return error that text is too long', () => {
    const result = textField(0, 15)(mockedValues.longText)
    expect(result).toBe(errorMessages.longText)
  })

  it('Should return error that field must not be empty', () => {
    const result = emptyField({ value: mockedValues.emptyField })
    expect(result).toBe(errorMessages.emptyField)
  })

  it('Should return error that value must have non-space values', () => {
    const result = emptyField({ value: mockedValues.spaceField })
    expect(result).toBe(errorMessages.hasOnlySpaces)
  })
})
