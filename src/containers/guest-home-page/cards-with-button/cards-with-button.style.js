import { slidesLeft, slidesRight } from '~/styles/app-theme/custom-keyframes'

export const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&> .MuiBox-root:nth-of-type(4) .dots': {
      display: { xs: 'none', sm: 'block' }
    }
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    m: { sm: '0px 60px', xs: '0px 20px' },
    flexGrow: '0'
  },
  button: {
    mt: '34px',
    width: '210px',
    height: '52px'
  },
  left: {
    box: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: { sm: 'row-reverse', xs: 'row' },
      padding: '0px 20px '
    },
    clearBox: {
      display: { xs: 'none', sm: 'flex' },
      flexBasis: '466px'
    },
    wrapper: {
      pt: '5px',
      flexBasis: '466px'
    },

    title: {
      marginBottom: '8px',
      textAlign: { sm: 'end', xs: 'start' }
    },
    description: {
      textAlign: { sm: 'end', xs: 'start' }
    },
    slidesIn: {
      animation: `${slidesRight} 1s ease-in-out`
    }
  },
  right: {
    box: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: '0px 20px'
    },
    clearBox: {
      display: { xs: 'none', sm: 'flex' },
      flexBasis: '466px'
    },
    wrapper: {
      pt: '5px',
      flexBasis: '466px'
    },
    title: {
      marginBottom: '8px',
      textAlign: 'start'
    },
    description: {
      textAlign: 'start'
    },
    slidesIn: {
      animation: `${slidesLeft} 1s ease-in-out`
    }
  }
}
