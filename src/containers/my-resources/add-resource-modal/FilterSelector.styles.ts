import palette from '~/styles/app-theme/app.pallete'
import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    maxWidth: { xs: '200px', md: '300px' },
    backgroundColor: 'primary.50',
    display: 'flex',
    alignItems: 'center',
    px: '12px',
    borderRadius: '100px'
  },
  openMenuBtn: { p: 0, ml: '5px' },
  text: { typography: TypographyVariantEnum.Subtitle1 },
  chosenFilters: {
    typography: TypographyVariantEnum.Subtitle1,
    ml: '4px',
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  arrowIcon: (open: boolean) => ({
    color: 'primary.900',
    transform: `rotate(${open ? 180 : 0}deg)`,
    transition: 'transform 0.3s ease'
  }),
  menu: (loading: boolean) => ({
    '& .simplebar-content': {
      ...(loading && { height: '216px', display: 'flex' })
    }
  }),
  menuPaperProps: {
    style: {
      width: '300px',
      marginTop: '8px',
      borderRadius: '8px',
      boxShadow: commonHoverShadow
    }
  },
  inputWrapper: { p: '15px 20px 0px 20px' },
  input: {
    m: '0 auto',
    width: '100%',
    borderRadius: '6px',
    p: { xs: 0, sm: 0 },
    border: `1px solid ${palette.primary[400]}`,
    '& > div': { pl: '10px' }
  },
  clearAll: (isSelected: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    columnGap: '3px',
    typography: TypographyVariantEnum.Subtitle2,
    ...(!isSelected && { color: 'primary.200' }),
    ...(isSelected && { cursor: 'pointer' }),
    m: '15px 20px 0 0'
  }),
  clearIcon: { height: '18px', width: '18px' },
  divider: {
    border: `1px solid ${palette.primary[200]}`,
    mt: '8px'
  },
  scrollableContent: { maxHeight: '216px' },
  loader: { color: 'primary.700' }
}
