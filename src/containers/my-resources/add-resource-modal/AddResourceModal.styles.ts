import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum, VisibilityEnum } from '~/types'

const input = {
  width: '100%',
  borderColor: 'primary.200',
  borderRadius: '6px'
}

export const styles = {
  root: { width: '65vw', p: '40px' },
  title: {
    mb: '32px',
    typography: TypographyVariantEnum.H4
  },
  inputWithFilter: { display: 'flex', gap: '16px' },
  searchIcon: { color: 'primary.700' },
  titleInput: {
    maxWidth: '350px',
    border: '1px solid',
    ...input
  },
  categoryInput: { maxWidth: '200px', ...input },
  categoryInputLabel: { color: palette.primary[400] },
  tableWrapper: (hasItems: boolean) => ({
    root: { my: '16px', height: '50vh' },
    tableContainer: {
      height: hasItems ? '50vh' : 'auto',
      '&::-webkit-scrollbar-track': { visibility: VisibilityEnum.Hidden },
      '&::-webkit-scrollbar-thumb': { borderRadius: 0 }
    }
  }),
  table: {
    '& th': { backgroundColor: 'primary.100' }
  },
  formControls: {
    display: 'flex',
    justifyContent: 'space-between',
    pl: '16px'
  },
  buttonsArea: {
    display: 'flex',
    justifyContent: 'end',
    gap: '30px'
  },
  addButton: { mr: '16px' }
}
