const container = {
  display: 'flex',
  alignItems: 'center'
}

export const styles = {
  container: { ...container, p: '12px' },
  cursorContainer: (clickable: boolean) => ({
    ...container,
    cursor: clickable ? 'pointer' : 'standart'
  }),
  title: {
    color: 'primary.700',
    mr: '7px',
    userSelect: 'none'
  },
  icon: {
    color: 'primary.700',
    mr: '7px'
  },
  chosenFiltersQty: {
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: 'inherit',
    alignItems: 'center',
    backgroundColor: 'primary.400',
    color: 'basic.white',
    userSelect: 'none'
  }
}
