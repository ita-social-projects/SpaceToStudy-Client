const selectInput = {
  width: '100%',
  label: {
    lineHeight: '20px'
  }
}

export const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '16px',
    mt: '24px'
  },
  autocomplete: {
    ...selectInput,
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    }
  },
  formControl: {
    ...selectInput,
    '& .MuiInputLabel': {
      padding: '5px 9px'
    }
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: '224px',
        width: 'auto'
      }
    }
  },
  clearBtn: {
    mr: '32px',
    color: 'primary.300'
  }
}
