import { TypographyVariantEnum } from '~/types'

const titleAndDescription = {
  fontSize: '16px',
  maxHeight: '16px',
  marginTop: 0
}

export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px',
    marginTop: '40px',
    marginBottom: '40px'
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
      ...titleAndDescription,
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
    style: titleAndDescription,
    disableUnderline: true
  },
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H6, top: -23 }
  },
  descriptionLabel: {
    sx: { typography: TypographyVariantEnum.Body1, top: -20 },
    shrink: false
  }
}
