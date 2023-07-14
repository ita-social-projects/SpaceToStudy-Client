export const updateCheckBoxState = (items, value, checkbox, fillRange) => {
  const removeCurrent = () => value.filter((el) => el !== checkbox)

  if (!fillRange || !value.length) {
    return value.includes(checkbox) ? removeCurrent() : [...value, checkbox]
  }

  const currentIndex = items.findIndex((item) => item === checkbox)
  const firstIndex = items.findIndex((item) => item === value[0])
  const lastIndex = items.findIndex((item) => item === value[value.length - 1])

  const startIndex = Math.min(currentIndex, firstIndex, lastIndex)
  const endIndex = Math.max(currentIndex, lastIndex)

  if (value.includes(checkbox)) {
    return startIndex === currentIndex
      ? removeCurrent()
      : items.slice(startIndex, currentIndex)
  }

  return items.slice(startIndex, endIndex + 1)
}
