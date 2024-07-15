type Suffixes = { suffix: string }

export const getSuffixes = (name: string, language: string): Suffixes => {
  let suffix = ''

  const suffixMapping: {
    [key: string]: {
      feminine: string[]
      masculine: string[]
      suffixes: { feminine: string; masculine: string }
    }
  } = {
    uk: {
      feminine: ['категорію'],
      masculine: ['предмет'],
      suffixes: {
        feminine: 'у',
        masculine: 'ий'
      }
    }
  }

  const languageSuffixes = suffixMapping[language]

  if (languageSuffixes) {
    if (languageSuffixes.feminine.includes(name)) {
      suffix = languageSuffixes.suffixes.feminine
    } else if (languageSuffixes.masculine.includes(name)) {
      suffix = languageSuffixes.suffixes.masculine
    }
  }

  return { suffix }
}
