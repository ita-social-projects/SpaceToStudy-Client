export const mapArrayByField = (data, transform) =>
  data.map((item) => item[transform])
