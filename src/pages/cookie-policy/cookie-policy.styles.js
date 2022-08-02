import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    color: palette.text.primary
  },
  sectionTitle: {
    '&:first-of-type': {
      background: palette.basic.grey,
      m: '30px 0 70px 0',
      py: '25px',
      borderRadius: '20px'
    }
  },
  itemsContainer: {
    m: '0 auto 40px auto',
    maxWidth: '744px'
  },
  wrapper: {
    textAlign: 'start'
  },
  title: {
    mb: '30px'
  },
  titleWithDot: {
    mb: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      background: palette.primary[500], 
      minWidth: '8px',
      height: '8px',
      borderRadius: '50%',
      mr: '20px'
    }
  }
}
