import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  filterToggle: {
    icon: { width: '20px', height: '20px' },
    title: { typography: TypographyVariantEnum.Body1, fontWeight: 500 }
  },
  drawer: {
    width: { xs: '100%', sm: '370px' },
    p: '24px 36px',
    boxSizing: 'border-box'
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '32px',
    mt: '-10px'
  },
  filterPaper: (isMobile: boolean) => ({
    style: {
      width: isMobile ? '100%' : '300px',
      marginTop: '8px',
      borderRadius: '8px',
      boxShadow: commonHoverShadow
    }
  }),
  filter: {
    root: {
      width: '100%',
      maxWidth: 'none',
      p: '8px',
      boxSizing: 'border-box',
      justifyContent: 'center'
    }
  },
  input: {
    flex: 1,
    border: '1px solid',
    borderColor: 'primary.200',
    borderRadius: '4px',
    '&:hover': { borderColor: 'primary.900' }
  },
  select: { flexDirection: 'column', rowGap: '3px', alignItems: 'left' },
  buttons: { display: 'flex', flexDirection: 'column', rowGap: '16px' }
}
