import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  divider: {
    mx: '16px',
    border: `1px solid ${palette.primary[200]}`
  },
  notesWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  notesIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    '& > p': {
      color: palette.basic.bismark,
      fontWeight: 500
    },
    '& > svg': {
      width: '25px',
      height: '25px',
      cursor: 'pointer'
    }
  }
}
