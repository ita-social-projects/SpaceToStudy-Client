const layout = {
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: { height: '100vh', ...layout },
  content: {
    overflowY: 'auto',
    backgroundColor: 'backgroundColor',
    flex: 1,
    ...layout
  }
}
