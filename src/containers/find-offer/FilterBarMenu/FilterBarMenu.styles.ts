const container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const styles = {
  container,
  rightContainer:{ ...container },
  selectContainer:{ marginRight: '50px' },
  filterListTitle: { justifyContent:'center' },
  mobileContainer:{ ...container, justifyContent:'center' }
}
