import { TypographyVariantEnum } from '~/types'

const menuItem = {
  p: '8px',
  display: 'flex',
  alignItems: 'center',
  typography: TypographyVariantEnum.Button
}

export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  dragIconWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  dragIcon: {
    fontSize: '30px',
    transform: 'rotate(90deg)',
    color: 'primary.400',
    cursor: 'pointer'
  },
  input: {
    style: { padding: 0, margin: 0 }
  },
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
  descriptionInput: {
    style: {
      marginTop: 0
    },
    disableUnderline: true
  },
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H6, top: -23 }
  },
  descriptionLabel: {
    sx: { typography: TypographyVariantEnum.Body1, top: -20 },
    shrink: false
  },
  menuItem: {
    ...menuItem,
    minWidth: '165px'
  },
  deleteIconWrapper: {
    ...menuItem,
    color: 'error.700'
  },
  menuIcon: {
    fontSize: '18px',
    mr: '10px'
  }
}
