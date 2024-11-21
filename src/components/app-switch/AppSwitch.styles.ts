import { SizeEnum } from '~/types'

const trackMixin = (width: number, borderWidth: number) => ({
  position: 'absolute',
  backgroundColor: '#F7F7F7 !important',
  border: `${borderWidth}px solid`,
  borderColor: 'primary.200',
  borderRadius: `${width / 3}px`,
  opacity: 1,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  '&.Mui-disabled': {
    color: 'primary.200'
  }
})

const thumbMixin = (diameter: number) => ({
  width: `${diameter}px`,
  height: `${diameter}px`,
  boxShadow: 'none',
  transition: 'transform 0.3s ease, background-color 0.3s ease'
})

const switchBaseMixin = (rWidth: number, tWidth: number) => ({
  position: 'relative',
  color: 'primary.400',
  padding: 0,
  left: `${rWidth / 10}px`,
  '&.Mui-checked': {
    color: 'primary.800',
    left: `${rWidth - tWidth - rWidth / 10 - 20}px` //source forces +20px on transformX (literally 2 days spent to investigate it) https://github.com/mui/material-ui/blob/v6.1.8/packages/mui-material/src/Switch/Switch.js
  },
  '&.Mui-disabled': {
    color: 'primary.200'
  }
})

const rootMixin = (width: number, height: number) => ({
  display: 'flex',
  alignItems: 'center',
  width: `${width}px`,
  height: `${height}px`,
  overflow: 'visible',
  padding: 0,
  margin: '5px',
  '&:hover': {
    '& .MuiSwitch-track': {
      borderColor: 'primary.500'
    }
  }
})
const getMixins = (
  trackWidth: number,
  trackHeight: number,
  thumbDiameter: number,
  trackBorderWidth: number
): object => {
  return {
    '&': rootMixin(trackWidth, trackHeight),
    '& .MuiSwitch-thumb': thumbMixin(thumbDiameter),
    '& .MuiSwitch-track': trackMixin(trackWidth, trackBorderWidth),
    '& .MuiSwitch-switchBase': switchBaseMixin(
      trackWidth + trackBorderWidth * 2,
      thumbDiameter
    )
  }
}
export const switchStyles: Record<string, object> = {
  [SizeEnum.Small.toString()]: getMixins(45, 21, 15, 1),
  [SizeEnum.Medium.toString()]: getMixins(60, 28, 20, 2),
  [SizeEnum.Large.toString()]: getMixins(75, 35, 25, 3)
}
export const formLabelStyles = {
  formLabelBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    overflow: 'visible'
  }
}
