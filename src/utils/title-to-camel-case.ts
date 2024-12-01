export function titleToCamel(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}
