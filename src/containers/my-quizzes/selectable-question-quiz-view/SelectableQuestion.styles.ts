import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: (isSelected: boolean) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '79px',
    backgroundColor: isSelected ? '#DAEFF0' : 'primary.50',
    borderRadius: '2px',
    cursor: 'pointer'
  }),
  quizQuestion: {
    root: {
      display: 'block',
      p: '20px 30px'
    }
  },
  statusLine: {
    height: '4px',
    backgroundColor: 'primary.200',
    width: '100%',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit'
  },
  text: {
    typography: TypographyVariantEnum.Subtitle2,
    my: '4px'
  },
  selectableList: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(79px, 1fr))',
    my: '32px'
  },
  buttons: {
    display: 'flex',
    gap: '24px',
    justifyContent: { xs: 'center', sm: 'flex-end' },
    mt: '32px'
  },
  backIcon: {
    mr: '5px'
  },
  nextIcon: {
    ml: '5px'
  }
}
