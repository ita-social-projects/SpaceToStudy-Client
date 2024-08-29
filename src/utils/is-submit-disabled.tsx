export const isSubmitDisabled = (items: { name: string }[]): boolean => {
  const areItemsPresent = items.length > 0
  const areAllItemsValid = items.every((item) => item.name)
  return areAllItemsValid && areItemsPresent
}
