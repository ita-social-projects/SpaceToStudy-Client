import { expect } from 'vitest';
import {
  emptyField,
  textField,
  helperTextHandler,
} from '~/utils/validations/common';

const mockedValues = {
  nameWithNumbers: 'name2',
  tooLongName: 'vvvveeeerrrryyyylllloooonnnnggggnnnnaaaammmmeeee',
  invalidNumber: '8w5',
  negativeNumber: '-5',
  shortPassword: '111a?',
  passwordWithoutNumbers: 'abc!dwga%g&sad',
  passwordWithInvalidSymbol: '123qw er58',
  passwordNoSymbol: 'Password123',
  passwordNoAlphabet: '123456!',
  passwordNoNumber: 'Password!',
  validPassword: 'Password123!',
  invalidEmail: 'example2example.com',
  shortText: 't',
  longText: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
  emptyField: '',
  spaceField: '    ',
};

const errorMessages = {
  nameAlphabeticOnly: 'common.errorMessages.nameAlphabeticOnly',
  nameLength: 'common.errorMessages.nameLength',
  numbersOnly: 'common.errorMessages.numbersOnly',
  positiveNumbersOnly: 'common.errorMessages.positiveNumbersOnly',
  passwordLength: 'common.errorMessages.passwordLength',
  passwordAlphabeticAndNumericAndSymbols:
    'common.errorMessages.passwordAlphabeticAndNumericAndSymbols',
  passwordValidSymbols: 'common.errorMessages.passwordValidSymbols',
  emailValid: 'common.errorMessages.emailValid',
  shortText: 'common.errorMessages.shortText',
  longText: 'common.errorMessages.longText',
  emptyField: 'common.errorMessages.emptyField',
  hasOnlySpaces: 'common.errorMessages.hasOnlySpaces',
};

export const emailField = (value) => {
  return helperTextHandler(value, 'email');
};

export const passwordField = (value) => {
  return helperTextHandler(value, 'password');
};

describe('commonValidation', () => {
  it('Should return error that password cannot be shorter than 8 and longer than 25 characters', () => {
    const result = passwordField(mockedValues.shortPassword);
    expect(result).toBe(errorMessages.passwordLength);
  });

  it('Should return error that password must contain at least one alphabetic and one numeric character', () => {
    const result = passwordField(mockedValues.passwordWithoutNumbers);
    expect(result).toBe(errorMessages.passwordAlphabeticAndNumericAndSymbols);
  });

  it('Should return error when password does not contain any numeric character', () => {
    const result = passwordField(mockedValues.passwordNoNumber);
    expect(result).toBe(errorMessages.passwordAlphabeticAndNumericAndSymbols);
  });

  it('Should return error when password does not contain any alphabetic character', () => {
    const result = passwordField(mockedValues.passwordNoAlphabet);
    expect(result).toBe(errorMessages.passwordAlphabeticAndNumericAndSymbols);
  });

  it('Should return error when password does not contain any symbol', () => {
    const result = passwordField(mockedValues.passwordNoSymbol);
    expect(result).toBe(errorMessages.passwordAlphabeticAndNumericAndSymbols);
  });

  it('Should not return an error for a valid password', () => {
    const result = passwordField(mockedValues.validPassword);
    expect(result).toBe('');
  });

  it('Should return error that email is invalid', () => {
    const result = emailField(mockedValues.invalidEmail);
    expect(result).toBe(errorMessages.emailValid);
  });

  it('Should return error that text is too short', () => {
    const result = textField(10, 25)(mockedValues.shortText);
    expect(result).toBe(errorMessages.shortText);
  });

  it('Should return error that text is too long', () => {
    const result = textField(0, 15)(mockedValues.longText);
    expect(result).toBe(errorMessages.longText);
  });

  it('Should return error that field must not be empty', () => {
    const result = emptyField({ value: mockedValues.emptyField });
    expect(result).toBe(errorMessages.emptyField);
  });

  it('Should return error that value must have non-space values', () => {
    const result = emptyField({ value: mockedValues.spaceField });
    expect(result).toBe(errorMessages.hasOnlySpaces);
  });
});
