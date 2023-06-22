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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
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
  iconButton: {
    color: 'basic.black',
    position: 'absolute',
    top: 0,
    right: 0
  },
  chipContainer: {
    container: {
      gap: '10px'
    },
    label: {
      fontSize: '10px',
      textTransform: 'uppercase',
      color: 'primary.500'
    }
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 'auto'
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
    gap: '16px'
  }
}
