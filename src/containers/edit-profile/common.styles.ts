import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const rootContainer = {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  rowGap: '10px',
  maxWidth: '768px',
  width: '100%',
  p: '20px 40px',
  backgroundColor: 'basic.white',
  color: 'basic.black',
  borderRadius: '4px',
  boxShadow: commonShadow
}

export const updateProfileBtn = {
  alignSelf: 'flex-end'
}

export const innerContainer = {
  maxWidth: '768px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}
