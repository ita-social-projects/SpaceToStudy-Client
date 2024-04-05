import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const rootContainer = {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  rowGap: '10px',
  maxWidth: '768px',
  width: '100%',
  m: '0 auto',
  p: '20px 40px',
  backgroundColor: 'basic.white',
  color: 'basic.black',
  borderRadius: '4px',
  boxShadow: commonShadow
}
