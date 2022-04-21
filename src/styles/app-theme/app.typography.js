import palette from './app.pallete.js'

const appTypography = {
  fontFamily: ['Poppins', 'Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
  h1: {
    color: palette.primary[900],
    opacity: '0.75',
    fontFamily: 'Rubik',
    fontWeight: 800,
    fontSize: '72px',
    letterSpacing: '-1.5px',
    lineHeight: '85px'
  },
  h2: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 600,
    fontSize: '61px',
    lineHeight: '92px',
    letterSpacing: '-0.5px'
  },
  h3: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '49px',
    lineHeight: '74px'
  },
  h4: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '35px',
    lineHeight: '53px'
  },
  h5: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '30px'
  },
  h6: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.15px'
  },
  subtitle1: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px'
  },
  subtitle2: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px'
  },
  body1: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px'
  },
  body2: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '21px',
    letterSpacing: '0.25%'
  },
  caption: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.4px'
  },
  overline: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '15px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },
  button: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    textTransform: 'capitalize'
  },
  button1: {
    color: palette.primary[900],
    opacity: '0.75',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.5px',
    textTransform: 'capitalize'
  }
}

export default appTypography
