export const mapArrayByField = <T,>(data: T[], transform: keyof T) =>
  data.map((item) => item[transform])
