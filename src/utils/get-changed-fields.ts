export function getChangedFields<T extends Record<string, unknown>>(
  initialState: T,
  currentState: T
): Partial<T> {
  const changes: Partial<T> = {}

  Object.keys(currentState).forEach((key) => {
    const typedKey = key as keyof T
    const initialValue = initialState[typedKey]
    const currentValue = currentState[typedKey]

    if (JSON.stringify(initialValue) !== JSON.stringify(currentValue)) {
      changes[typedKey] = currentValue
    }
  })

  return changes
}
