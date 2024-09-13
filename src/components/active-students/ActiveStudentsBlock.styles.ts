import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  title: {
    pt: '2rem',
    px: '3.5rem',
    typography: { md: 'h4', xs: 'h5' }
  },
  activeStudentsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { md: '70px', xs: '30px' },
    flexWrap: 'wrap',
    mt: '34px',
    p: '20px'
  },
  showMoreWrapper: {
    width: { xs: '180px', md: 'auto' },
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    color: palette.basic.blueGray
  },
  showMoreButton: {
    background: palette.basic.grey,
    color: palette.basic.lightBlue,
    width: '70px',
    height: '70px',
    fontSize: '24px'
  }
}
