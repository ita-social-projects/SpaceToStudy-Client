export const isSubmitDisabled = (items: { _id: string }[]): boolean => {
  const areItemsPresent = items.length > 0
  const areAllItemsValid = items.every((item) => item._id)
  return areAllItemsValid && areItemsPresent
}
