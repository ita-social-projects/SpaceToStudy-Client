export const validationPatterns = {
  name: /^[a-zа-яєії' -]+$/i,
  number: /^-?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/,
  email: /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
  passwordValid: /^\S+$/i,
  passwordAlphabeticAndNumeric: /^(?=.*[a-zа-яєії])(?=.*\d).+$/i
}
