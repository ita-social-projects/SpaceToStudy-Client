const link = {
  color: 'primary.900',
  textDecoration: 'none',
  typography: 'caption',
  whiteSpace: 'nowrap'
}

export const styles = {
  root: {
    py: 4
  },
  separator: {
    width: '4px',
    height: '4px',
    borderRadius: '4px',
    mx: '4px',
    backgroundColor: 'primary.400'
  },
  link,
  previous: {
    ...link,
    fontWeight: '500'
  },
  breadCrumbs: {
    '& ol': {
      flexWrap: 'nowrap',
      overflowX: 'auto',
      '&::-webkit-scrollbar': { display: 'none' }
    }
  }
}
