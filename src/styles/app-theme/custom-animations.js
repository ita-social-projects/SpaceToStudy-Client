import { keyframes } from '@mui/system'

export const fade = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`

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

export const fadeAnimation = {
  animation: `${fade} 0.5s ease-in`
}

export const slidesRightAnimation = {
  animation: `${slidesRight} .3s ease-in-out`
}

export const slidesLeftAnimation = {
  animation: `${slidesLeft} .3s ease-in-out`
}
