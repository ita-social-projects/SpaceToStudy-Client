import { keyframes } from '@mui/system'
import palette from '~/styles/app-theme/app.pallete'

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
export const SlidesLeftLong = keyframes`
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(0px);
  }
`

export const colorChange = keyframes`
    0% { color: ${palette.success[300]}; }
    50% { color: ${palette.success[500]}; }
    100% { color: ${palette.success[300]}; }
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

export const SlideLeftLongAnimation = {
  animation: `${SlidesLeftLong} .5s ease-in-out`
}

export const colorChangeAnimation = {
  animation: `${colorChange} 1.5s ease-in-out infinite`
}
