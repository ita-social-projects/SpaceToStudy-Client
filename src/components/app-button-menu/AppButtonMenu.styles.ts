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
  text: { typography: TypographyVariantEnum.Subtitle1 },
  chosenFilters: {
    typography: TypographyVariantEnum.Subtitle1,
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  arrowIcon: (open: boolean) => ({
    color: 'primary.900',
    transform: `rotate(${open ? 180 : 0}deg)`,
    transition: 'transform 0.3s ease',
    p: 0,
    ml: '5px'
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
  noMatches: {
    typography: TypographyVariantEnum.Subtitle1,
    p: '15px 25px',
    display: 'flex',
    alignItems: 'center',
    columnGap: 1
  },
  scrollableContent: { maxHeight: '216px' },
  loader: { color: 'primary.700' },
  noItemsIcon: { color: 'primary.400' },
  unorderedListIcon: {
    width: '14px',
    height: '14px'
  }
}
