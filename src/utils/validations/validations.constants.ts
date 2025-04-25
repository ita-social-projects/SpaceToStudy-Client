export const validationPatterns = {
  name: /^[a-zа-яєії' -]+$/i,
  number: /^-?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/,
  email:
    /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/,
  passwordValid: /^\S+$/i,
  passwordAlphabeticAndNumeric: /^(?=.*[a-zа-яєії])(?=.*\d).+$/i
}
