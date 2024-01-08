import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  tabsWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: palette.basic.blueGray,
    mb: '20px'
  },
  notes: {
    py: '10px',
    color: 'inherit'
  },
  tabs: {
    root: {
      '& > button': {
        minWidth: '100px'
      },
      '& > button:first-of-type': {
        minWidth: '70px'
      },
      '& > button:last-child': {
        position: 'relative'
      },
      '& > button:nth-of-type(2):before': {
        content: '" "',
        position: 'absolute',
        height: '32px',
        left: 0,
        borderLeft: `1px solid ${palette.primary[100]}`
      }
    }
  }
}
