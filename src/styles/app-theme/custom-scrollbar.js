export const scrollbar = {
  '&::-webkit-scrollbar': {
    background: 'none'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'none'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'none'
  },
  '&:hover': {
    '&::-webkit-scrollbar': {
      background: 'none',
      '&:hover': {
        cursor: 'pointer !important'
      }
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgba(43, 49, 52, 0.3)'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#9DA7AC',
      '&:hover': {
        background: '#727E84'
      }
    }
  }
}

export const textfieldScrollbar = {
  '& ::-webkit-scrollbar': {
    background: 'none'
  },
  '& ::-webkit-scrollbar-track': {
    boxShadow: 'none'
  },
  '& ::-webkit-scrollbar-thumb': {
    background: 'none'
  },
  '& :hover': {
    '&::-webkit-scrollbar': {
      background: 'none',
      '&:hover': {
        cursor: 'pointer !important'
      }
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgba(43, 49, 52, 0.3)'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#9DA7AC',
      '&:hover': {
        background: '#727E84'
      }
    }
  }
}
