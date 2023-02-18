import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    color: 'primary.900',
    display: { sm: 'flex' },
    justifyContent: 'space-between',
    gap: { sm: '30px', lg: '50px' },
    my: '50px',
    px: '15px',
    maxHeight: '525px'
  },
  imgNameIconWrapper: {
    display: 'flex',
    gap: '15px'
  },
  imgWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    maxWidth: '525px'
  },
  img: {
    width: '100%',
    minWidth: '150px',
    minHeight: '150px',
    borderRadius: '15px'
  },
  infoWrapper: {
    maxWidth: { xs: '552px' }
  },
  nameAndIconWrapper: {
    display: 'flex',
    alignItems: 'start'
  },
  iconBtn: {
    backgroundColor: 'basic.grey'
  },
  name: {
    typography: { xs: 'button', sm: 'h5', md: 'h4' },
    mb: '10px'
  },
  status: {
    typography: { xs: 'body2', md: 'button' }
  },
  chipsWrapper: {
    py: '16px'
  },
  schoolIcon: {
    pl: '5px',
    fill: palette.primary[500]
  },
  accInfoWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: { xs: '20px 10px', md: '66px 10px' },
    p: { md: '15px 20px', lg: '25px 20px' },
    my: { xs: '15px', sm: 0 }
  },
  buttonGroup: {
    display: 'flex',
    position: 'sticky',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1, md: 3 },
    width: '100%',
    top: '100%',
    pt: '20px'
  },
  ratingIcon: {
    position: 'relative',
    top: '3px',
    color: 'basic.yellow',
    width: { xs: '18px', md: '24px' },
    height: { xs: '18px', md: '24px' }
  }
}
