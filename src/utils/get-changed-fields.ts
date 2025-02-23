type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export function getChangedFields<T>(
  initialState: Readonly<Partial<T>> | null,
  currentState: Readonly<Partial<T>> | null
): Partial<Nullable<T>> {
  if (!initialState || !currentState) return {}

  const changes: Partial<Nullable<T>> = {}

  Object.keys(currentState).forEach((key) => {
    const typedKey = key as keyof T
    const initialValue = initialState[typedKey]
    const currentValue = currentState[typedKey]

    if (
      (currentValue !== undefined || initialValue !== undefined) &&
      JSON.stringify(initialValue) !== JSON.stringify(currentValue)
    ) {
      changes[typedKey] = currentValue ?? null
    }
  })

  return changes
}
