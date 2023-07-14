import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    position: 'relative',
    color: 'primary.900',
    display: { sm: 'flex' },
    justifyContent: 'space-between',
    gap: { sm: '30px', lg: '50px' },
    mb: '50px',
    maxHeight: { sm: '525px' }
  },
  img: {
    width: '100%',
    height: '100%',
    minWidth: '150px',
    minHeight: '150px',
    borderRadius: '15px'
  },
  infoWrapper: {
    maxWidth: { sm: '345px', lg: '834px' },
    width: '100%'
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
      textAlign: 'left',
      pr: '20px'
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
  },
  wrapperForPhoto: {
    display: 'flex',
    gap: '10px'
  },
  avatarContainer: {
    flex: 1,
    maxWidth: '525px'
  },
  avatarContainerMobile: { flex: 1 },
  linkToReviews: { color: 'primary.900' },
  appRating: {
    starMobile: {
      height: { sm: '18px', md: '24px' }
    },
    rating: {
      typography: { sm: 'h6', md: 'h5' }
    },
    reviews: {
      typography: 'overline'
    }
  }
}
