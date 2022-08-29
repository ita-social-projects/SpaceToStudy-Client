import { keyframes } from '@mui/system'

export const fade = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`

export const fadeAnimation = {
  animation: `${fade} 0.5s ease-in`
}
