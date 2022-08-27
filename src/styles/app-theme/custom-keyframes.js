import { keyframes } from '@mui/system'

export const slidesRight = keyframes`
  from {
    transform: translateX(-10%);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
`

export const slidesLeft = keyframes`
  from {
    transform: translateX(10%);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
`
