import { TypographyVariantEnum } from '~/types'

export const styles = {
  cardContainer: {
    display: 'flex',
    width: '100%',
    height: { xs: 'fit-content', sm: '97px' },
    backgroundColor: 'basic.white',
    borderRadius: '16px',
    boxShadow: `0px 9px 12px 1px #90A4AE24, 
    0px 3px 16px 2px #90A4AE1F, 
    0px 5px 6px -3px #90A4AE33`
  },

  avatar: {
    m: { xs: '11px 0px 11px 5px', sm: '11px 0px 11px 13px' },
    width: { xs: '50px', sm: '75px' },
    height: { xs: '50px', sm: '75px' }
  },
  mainInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    ml: '9px'
  },

  time: {
    color: 'basic.blueGray',
    mt: '11px',
    typography: TypographyVariantEnum.Subtitle2
  },

  priceAndMessage: {
    display: 'flex',
    flexDirection: 'column',
    m: { xs: '7px 10px 7px auto', sm: '7px 20px 7px auto' },
    alignItems: 'flex-end',
    gap: '20px',
    '& p': {
      typography: {
        xs: TypographyVariantEnum.Subtitle2,
        sm: TypographyVariantEnum.H6
      },
      fontWeight: { xs: '600' },
      color: 'basic.lightBlue',
      '& span': {
        typography: {
          xs: TypographyVariantEnum.Caption,
          sm: TypographyVariantEnum.Subtitle1
        },
        color: '#basic.grey'
      }
    }
  },

  subject: {
    typography: {
      xs: TypographyVariantEnum.Caption,
      sm: TypographyVariantEnum.Body2
    },
    color: 'basic.lightBlue'
  },

  userName: {
    typography: {
      xs: TypographyVariantEnum.Subtitle1,
      sm: TypographyVariantEnum.H6
    },
    fontWeight: { xs: 500 },
    color: 'basic.lightBlue'
  }
}
