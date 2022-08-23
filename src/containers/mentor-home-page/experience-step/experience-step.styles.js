import { fade } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: 2,
    animation: `${fade} 0.5s ease-in-out`
  },
  img: {
    borderRadius: '20px'
  },
  form: {
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pt: 10
  }
}
