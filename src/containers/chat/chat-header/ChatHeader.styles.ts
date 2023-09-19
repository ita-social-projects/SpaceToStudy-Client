import { TypographyVariantEnum } from '~/types'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

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
    width: '100%',
    position: 'absolute',
    zIndex: '1',
    top: '75px',
    left: '0px',
    pt: '10px',
    boxShadow: mainShadow
  }
}
