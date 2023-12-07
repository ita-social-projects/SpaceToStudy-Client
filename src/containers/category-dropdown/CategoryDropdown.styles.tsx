const addButton = {
  justifyContent: 'flex-start',
  pl: '10px',
  gap: '5px'
}

export const styles = {
  addButtonOptions: { ...addButton },
  addButtonNoOptions: {
    ...addButton,
    pl: '0'
  },
  labelCategory: {
    color: 'primary.600',
    maxWidth: '464px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  divider: {
    color: 'primary.300'
  }
}
