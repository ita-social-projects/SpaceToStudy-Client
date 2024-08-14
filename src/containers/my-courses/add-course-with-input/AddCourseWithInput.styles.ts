const box = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '24px'
}

export const styles = {
  filtersBox: (isTablet: boolean) => ({
    ...box,
    width: '100%',
    maxWidth: isTablet ? '300px' : '642px'
  }),
  container: {
    ...box,
    mb: '32px'
  },
  addIcon: { width: { xs: '18px', sm: '22px' }, ml: '5px' },
  searchIcon: { color: 'primary.700' },
  input: {
    flex: 1,
    maxWidth: '285px',
    width: '100%',
    height: '44px',
    border: '1px solid',
    borderColor: 'primary.200',
    borderRadius: '4px'
  },
  addBtn: {
    width: '100%',
    mr: '16px'
  },
  sortInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    mb: '16px'
  }
}
