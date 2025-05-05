export const validationPatterns = {
  name: /^[a-zа-яєії' -]+$/i,
  number: /^-?(?:\d+|\d*\.\d+)(?:[eE][+-]?\d+)?$/,
  email:
    /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/,
  passwordComplex:
    /^(?=.*[a-zа-яєії])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).+$/i,
  passwordValid: /^\S+$/i
}
