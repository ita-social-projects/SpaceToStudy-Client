import palette from './app.pallete'

const table = {
  styleOverrides: {
    root: {
      '&.MuiTableRow-hover:hover': {
        backgroundColor: palette.basic.grey
      },
      '& .MuiTableCell-root': {
        borderBottom: 'none'
      }
    }
  }
}

export default table
