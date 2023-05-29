import { ReportHandler } from 'web-vitals'

const reportWebVitals = (onPerfEntry: ReportHandler): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    void import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry)
        getFID(onPerfEntry)
        getFCP(onPerfEntry)
        getLCP(onPerfEntry)
        getTTFB(onPerfEntry)
      }
    )
  }
}

export default reportWebVitals
