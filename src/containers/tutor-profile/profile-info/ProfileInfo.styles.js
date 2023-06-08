import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    position: 'relative',
    color: 'primary.900',
    display: { sm: 'flex' },
    justifyContent: 'space-between',
    gap: { sm: '30px', lg: '50px' },
    mb: '50px',
    px: '15px',
    maxHeight: { sm: '525px' }
  },
  img: {
    width: '100%',
    minWidth: '150px',
    minHeight: '150px',
    borderRadius: '15px',
    maxWidth: '500px'
  },
  infoWrapper: {
    maxWidth: '552px'
  },
  iconBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'basic.grey'
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
    gap: '20px 10px',
    py: { xs: '10px', lg: '25px' }
  },
  buttonGroup: {
    display: 'flex',
    position: 'sticky',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1, md: 3 },
    width: '100%',
    minWidth: { sm: '313px' },
    top: '100%',
    pt: '20px'
  },
  ratingIcon: {
    position: 'relative',
    top: '3px',
    color: 'basic.yellow',
    width: { xs: '18px', md: '24px' },
    height: { xs: '18px', md: '24px' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: { xs: 'button', sm: 'h5', md: 'h4' },
      mb: 1
    },
    description: {
      typography: { xs: 'body2', md: 'button' }
    }
  },
  doneIcon: {
    color: 'basic.orientalHerbs'
  },
  profileTitleComp: {
    wrapper: {
      textAlign: 'center'
    },
    title: {
      typography: { md: 'h5' }
    },
    description: {
      typography: 'overline'
    }
  }
}
