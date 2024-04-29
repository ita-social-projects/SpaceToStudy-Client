import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    width: { lg: '1130px', md: '786px', xs: '100%' },
    height: { xs: '100svh', sm: '600px' },
    p: { sm: '40px', xs: '20px' },
    boxSizing: 'border-box',
    backgroundColor: 'backgroundColor',
    display: 'flex',
    flexDirection: 'column'
  },
  titleWithDescription: {
    title: { typography: TypographyVariantEnum.H5 },
    description: {
      typography: TypographyVariantEnum.Caption,
      color: 'primary.600'
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '16px',
    mt: '32px'
  },
  toolbarContainer: {
    display: 'flex',
    justufyContent: 'space-between',
    alignItems: 'center',
    gap: '16px'
  },
  searchIcon: { color: 'primary.700' },
  searchInput: {
    width: '100%',
    maxWidth: { md: '350px', xs: '220px' },
    border: `1px solid ${palette.primary[400]}`,
    borderRadius: '6px'
  },
  filtersBtn: {
    cursor: 'pointer'
  },
  cardsWrapper: {
    gap: '16px',
    mb: 0
  },
  cardsScroll: (isFiltersOpened: boolean) => ({
    height: isFiltersOpened ? '228px' : '300px',
    margin: '16px 0',
    overflow: 'auto',
    padding: '10px 20px 10px 10px',
    flex: '3 0 auto'
  }),
  card: {
    card: {
      minHeight: '245px',
      cursor: 'pointer'
    },
    title: { typography: TypographyVariantEnum.MidTitle },
    description: { typography: TypographyVariantEnum.Caption },
    secondaryText: { typography: TypographyVariantEnum.Caption },
    chipContainer: { '& > div .MuiChip-label': { p: '3px 6px' } }
  },
  notFound: {
    container: { my: '0px' },
    imgTitleDescription: {
      titleWithDescription: {
        title: {
          typography: TypographyVariantEnum.H5,
          m: { xs: '10px 0', md: '25px 0 10px' }
        }
      }
    }
  },
  buttonsArea: { display: 'flex', justifyContent: 'end', columnGap: '16px' },
  loaderWrapper: { height: '300px' }
}
