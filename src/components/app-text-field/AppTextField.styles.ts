export const styles = {
  helperText: (multiline?: boolean) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    mr: multiline ? '48px' : '14px'
  })
}
