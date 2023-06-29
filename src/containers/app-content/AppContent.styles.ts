const layout = {
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: {
    height: '100vh',
    color: 'primary.900',
    backgroundColor: 'backgroundColor',
    ...layout
  },
  content: {
    overflowY: 'auto',
    flex: 1,
    '&::-webkit-scrollbar-track': {
      marginBottom: '-4px'
    },
    ...layout
  }
}
