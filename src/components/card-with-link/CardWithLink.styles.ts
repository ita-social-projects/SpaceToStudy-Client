import { alpha } from '@mui/material/styles'

export const styles = {
  card: {
    p: { xs: '20px 30px', lg: '25px 32px' },
    display: 'flex',
    gap: '24px',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: (bgColor: string) => ({
    flexShrink: 0,
    width: '62px',
    height: '62px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(bgColor, 0.2)
  }),
  icon: (color: string) => ({
    width: '32px',
    height: '32px',
    color: color
  }),
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}
