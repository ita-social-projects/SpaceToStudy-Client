import { TypographyVariantEnum, VisibilityEnum } from '~/types'

export const styles = {
  root: { width: '65vw', p: '20px' },
  title: { mb: '32px', typography: TypographyVariantEnum.H4 },
  searchIcon: { color: 'primary.700' },
  input: {
    maxWidth: '250px',
    width: '100%',
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '6px'
  },
  tableWrapper: (hasItems: boolean) => ({
    root: { my: '16px', height: '50vh' },
    tableContainer: {
      height: hasItems ? '50vh' : 'auto',
      '&::-webkit-scrollbar-track': { visibility: VisibilityEnum.Hidden },
      '&::-webkit-scrollbar-thumb': { borderRadius: 0 }
    }
  }),
  table: { '& th': { backgroundColor: 'primary.100' } },
  buttonsArea: { display: 'flex', justifyContent: 'space-between' },
  addButton: { mr: '16px' }
}
