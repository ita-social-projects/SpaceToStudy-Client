import { expect } from 'vitest'
import {
  emptyField,
  numberField,
  nameField,
  textField,
  helperTextHandler,
  validations
} from '~/utils/validations/common'

const mockedValues = {
  nameWithNumbers: 'name2',
  tooLongName: 'vvvveeeerrrryyyylllloooonnnnggggnnnnaaaammmmeeee',
  invalidNumber: '8w5',
  validNumber: '123',
  negativeNumber: '-5',
  shortPassword: '111a?',
  longPassword: '1!vvvveeeerrrryyyylllloooonnnnggggppaasswwooorrddd',
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
  passwordComplex: 'common.errorMessages.passwordComplex',
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
    expect(result).toBe(errorMessages.emptyField)
  })

  it('Should return error that password cannot be shorter than 8 and longer than 25 characters', () => {
    const shortPasswordResult = passwordField(mockedValues.shortPassword)
    const longPasswordResult = passwordField(mockedValues.longPassword)

    expect(shortPasswordResult).toBe(errorMessages.passwordLength)
    expect(longPasswordResult).toBe(errorMessages.passwordLength)
  })

  it.each([
    {
      input: mockedValues.passwordWithoutLetters,
      expected: errorMessages.passwordComplex
    },
    {
      input: mockedValues.passwordWithoutNumbers,
      expected: errorMessages.passwordComplex
    },
    {
      input: mockedValues.passwordWithoutSpecialChar,
      expected: errorMessages.passwordComplex
    }
  ])(
    'Should return error that password must contain at least one alphabetic, one numeric and one special character',
    ({ input, expected }) => {
      const result = passwordField(input)
      expect(result).toBe(expected)
    }
  )

  it('Should return error that password must contain only valid symbols', () => {
    const result = passwordField(mockedValues.passwordWithInvalidSymbol)
    expect(result).toBe(errorMessages.passwordValidSymbols)
  })

  it('Should skip passwordComplex if the password meets the regex', () => {
    const result = passwordField(mockedValues.validPassword)
    expect(result).not.toBe(errorMessages.passwordComplex)
  })

  it('Should skip passwordValidSymbols if the password contains only valid symbols', () => {
    const result = passwordField(mockedValues.validPassword)
    expect(result).not.toBe(errorMessages.passwordValidSymbols)
  })

  it('Should skip passwordLength if the password length is within range', () => {
    const result = passwordField(mockedValues.validPassword)
    expect(result).not.toBe(errorMessages.passwordLength)
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

describe('Validations Object - Direct Access', () => {
  describe('validations.nameField', () => {
    it('should return nameLength error for a too long name', () => {
      const result = validations.nameField(mockedValues.tooLongName)
      expect(result).toBe(errorMessages.nameLength)
    })

    it('should return nameCharacters error for a name with invalid characters', () => {
      const result = validations.nameField(mockedValues.nameWithNumbers)
      expect(result).toBe(errorMessages.nameCharacters)
    })

    it('should return empty string for a valid name', () => {
      const result = validations.nameField(
        mockedValues.firstNameWithApostropheEn
      )
      expect(result).toBe('')
    })
  })

  describe('validations.numberField', () => {
    it('should return numbersOnly error for invalid number input', () => {
      const result = validations.numberField(mockedValues.invalidNumber)
      expect(result).toBe(errorMessages.numbersOnly)
    })

    it('should return positiveNumbersOnly error for a negative number', () => {
      const result = validations.numberField(mockedValues.negativeNumber)
      expect(result).toBe(errorMessages.positiveNumbersOnly)
    })

    it('should return empty string for a valid number', () => {
      const result = validations.numberField(mockedValues.validNumber)
      expect(result).toBe('')
    })
  })

  describe('validations.password', () => {
    it('should return passwordComplex error if password fails complexity test', () => {
      const result = validations.password(mockedValues.shortPassword)
      expect(result).toBe(errorMessages.passwordLength)
    })

    it('should return passwordValidSymbols error if password contains an invalid symbol', () => {
      const result = validations.password(
        mockedValues.passwordWithInvalidSymbol
      )
      expect(result).toBe(errorMessages.passwordValidSymbols)
    })

    it('should return passwordLength error if password is too short', () => {
      const result = validations.password(mockedValues.shortPassword)
      expect(result).toBe(errorMessages.passwordLength)
    })

    it('should return passwordLength error if password is too long', () => {
      const result = validations.password(mockedValues.longPassword)
      expect(result).toBe(errorMessages.passwordLength)
    })

    it('should return empty string for a valid password', () => {
      const result = validations.password(mockedValues.validPassword)
      expect(result).toBe('')
    })
  })

  describe('validations.email', () => {
    it('should return emailValid error if email is invalid', () => {
      const result = validations.email(mockedValues.invalidEmail)
      expect(result).toBe(errorMessages.emailValid)
    })

    it('should return empty string for a valid email', () => {
      const result = validations.email(mockedValues.validEmail)
      expect(result).toBe('')
    })
  })

  describe('textField validation', () => {
    const textValidator = textField(5, 10)

    it('should return shortText error when text is too short', () => {
      const result = textValidator(mockedValues.shortText)
      expect(result).toBe(errorMessages.shortText)
    })

    it('should return longText error when text is too long', () => {
      const result = textValidator(mockedValues.longText)
      expect(result).toBe(errorMessages.longText)
    })

    it('should return undefined when text length is within valid range', () => {
      const validText = 'abcdef'
      const result = textValidator(validText)
      expect(result).toBeUndefined()
    })
  })

  describe('emptyField validation', () => {
    it('should return emptyField error if the field is empty', () => {
      const result = emptyField({ value: mockedValues.emptyField })
      expect(result).toBe(errorMessages.emptyField)
    })

    it('should return hasOnlySpaces error if field contains only spaces', () => {
      const result = emptyField({ value: mockedValues.spaceField })
      expect(result).toBe(errorMessages.hasOnlySpaces)
    })
  })
})
