const layout = {
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: { height: '100vh', backgroundColor: 'backgroundColor', ...layout },
  content: {
    overflowY: 'auto',
    flex: 1,
    ...layout
  }
}
