export const mapArrayByField = <T extends Array<any>>(
  data: T,
  transform: string
): string[] => data.map((item) => item[transform])
