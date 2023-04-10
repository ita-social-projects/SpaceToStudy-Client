export const mapArrayByField = <T,>(data: T, transform: string) =>
  Array.isArray(data) && data.reduce((acc, item) => [...acc, item[transform]], [])
