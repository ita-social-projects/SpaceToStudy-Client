export const styles = {
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: '224px',
        width: '250px'
      }
    }
  },
  inputColor: (hasError: boolean) => ({
    color: hasError ? 'red' : 'basic.bismark'
  })
}
