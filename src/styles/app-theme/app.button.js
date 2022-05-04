import palette from './app.pallete.js'

const button = {
  styleOverrides: {
    root: {
      lineHeight: '20px',
      opacity: '1',
    },
    sizeSmall: {
      padding: '6px 16px',
      fontSize: '14px',
    },
    sizeMedium: {
      padding: '10px 24px',
      fontSize: '14px',
    },
    sizeLarge: {
      padding: '12px 24px'
    },
    contained: {
      backgroundColor: palette.primary[900]
    },
  },
}

export default button
