import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    width: '100%'
  },
  title: {
    color: 'primary.700',
    typography: { xs: TypographyVariantEnum.H6, sm: TypographyVariantEnum.H6 }
  },
  cardsContainer: {
    mt: { xs: '20px', sm: '30px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  card: {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'primary.100',
    p: 0
  },
  iconTitleDescription: {
    container: {
      display: 'flex',
      alignItems: 'start',
      width: '100%',
      p: { xs: '10px 15px', sm: '25px' },
      color: 'primary.500'
    },
    icon: {
      display: { xs: 'none', sm: 'block' },
      svg: {
        width: '40px',
        height: '40px'
      }
    },
    titleWithDescription: {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: { xs: '10px', sm: '15px' },
        mx: { xs: 0, sm: '20px', md: '35px' }
      },
      title: {
        typography: {
          xs: TypographyVariantEnum.Subtitle2,
          sm: TypographyVariantEnum.H6
        }
      },
      description: {
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, max-content)',
          md: 'repeat(3, max-content)'
        },
        gap: { xs: '10px', sm: '10px 40px' },
        typography: {
          xs: TypographyVariantEnum.Body2,
          sm: TypographyVariantEnum.Body1
        }
      }
    }
  },
  titleWithDescription: {
    wrapper: {
      display: 'flex',
      columnGap: '5px'
    },
    title: {
      display: 'flex',
      alignItems: 'center'
    },
    description: {
      typography: {
        xs: TypographyVariantEnum.Body2,
        sm: TypographyVariantEnum.Body1
      }
    }
  },
  doneIcon: { color: 'basic.orientalHerbs' }
}
