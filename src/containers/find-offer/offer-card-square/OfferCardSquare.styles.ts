import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    justifyContent: 'space-between'
  },
  cardTopContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '16px',
    flex: 'none',
    flexGrow: '0',
    order: '0',
    alignSelf: 'stretch'
  },
  cardBottomContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '16px',
    flex: 'none',
    order: '1',
    flexGrow: '0'
  },
  userInfo: {
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: '20px'
    },
    avatar: {
      height: '100px',
      width: '100px'
    },
    info: {
      gap: '10px'
    }
  },
  description: {
    ...ellipsisTextStyle(2),
    typography: 'midTitle',
    fontWeight: 600,
    color: 'primary.700'
  },
  devider: {
    width: '100%'
  },
  iconButton: {
    color: 'basic.black',
    position: 'absolute',
    top: 0,
    right: 0
  },
  chipContainer: {
    chips: {
      mb: '16px',
      flexDirection: 'row'
    },
    chipsContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      m: '0'
    }
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 'auto',
    width: '100%'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: 'h6'
    },
    description: {
      typography: 'caption'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  }
}
