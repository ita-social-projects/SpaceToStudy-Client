import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: { position: 'relative', alignItems: 'center', p: '14px 24px' },
  menuIconBtn: { position: 'absolute', left: '24px' },
  titleWithDescription: {
    wrapper: { m: '0 auto' },
    title: { typography: TypographyVariantEnum.H6 },
    description: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '5px',
      color: 'primary.700'
    }
  },
  statusBadge: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'success.400'
  },
  actions: {
    display: 'flex',
    position: 'absolute',
    columnGap: '5px',
    right: '24px'
  },
  icon: { color: 'primary.700' },
  searchContainer: {
    p: 0,
    mt: '10px'
  }
}
