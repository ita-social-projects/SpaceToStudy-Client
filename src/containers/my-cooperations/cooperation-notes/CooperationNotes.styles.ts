import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  divider: {
    mx: '16px',
    border: `1px solid ${palette.primary[200]}`
  },
  notesWrapper: (isNotes: boolean) => ({
    width: isNotes ? { md: '400px', sm: '380px' } : '0px'
  }),
  notesIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > p': {
      color: palette.basic.bismark,
      fontWeight: 500
    },
    '& > svg': {
      width: { md: '22px', sm: '18px' },
      height: { md: '22px', sm: '18px' },
      cursor: 'pointer'
    }
  }
}
