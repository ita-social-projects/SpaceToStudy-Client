export function cn(...args: unknown[]): string {
  return args
    .flat(5)
    .reduce<string[]>((previousValue, currentValue) => {
      if (!currentValue) return previousValue

      if (typeof currentValue === 'object') {
        Object.entries(currentValue).forEach(([k, v]) => {
          if (v) previousValue.push(k)
        })
        return previousValue
      }

      if (typeof currentValue === 'string') {
        previousValue.push(currentValue)
        return previousValue
      }

      return previousValue
    }, [])
    .join(' ')
    .trim()
}
