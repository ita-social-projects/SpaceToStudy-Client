import { commonShadow } from '~/styles/app-theme/custom-shadows'
import palette from '~/styles/app-theme/app.pallete'

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

export const highlightElem = {
  visibility: 'hidden',
  position: 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  width: '100%',
  backgroundColor: palette.basic.turquoise50,
  border: `1px solid ${palette.basic.turquoise700}`,
  borderRadius: '4px',
  zIndex: '0',
  transition: '1s ease'
}
