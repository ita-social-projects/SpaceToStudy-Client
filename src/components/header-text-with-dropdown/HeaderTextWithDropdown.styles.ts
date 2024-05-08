import { TypographyVariantEnum } from '~/types'

export const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  input: (disabled: boolean) => ({
    style: { padding: 0, margin: 0 },
    disabled: disabled
  }),
  titleInput: {
    disableUnderline: true,
    style: {
      marginTop: 0,
      fontSize: '20px',
      maxHeight: '20px',
      fontWeight: 500
    }
  },
  headerIconWrapper: {
    marginRight: '20px'
  },
  headerIcon: {
    fontSize: '24px'
  },
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H6, top: -23 }
  },
  deleteIconWrapper: {
    p: '8px',
    display: 'flex',
    alignItems: 'center',
    typography: TypographyVariantEnum.Button,
    color: 'error.700'
  },
  menuIcon: {
    fontSize: '18px',
    mr: '10px'
  }
}
