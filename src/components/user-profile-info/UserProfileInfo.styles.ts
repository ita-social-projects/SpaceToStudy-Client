import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  avatar: {
    height: '48px',
    width: '48px',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  name: {
    color: 'primary.500',
    typography: 'button',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: palette.primary[300]
    }
  },
  rating: {
    backgroundColor: 'primary.50'
  },
  reviews: {
    typography: 'caption',
    color: 'primary.500'
  },
  date: {
    typography: 'body2',
    color: 'primary.400'
  },
  link: { textDecoration: 'none' }
}
