export const styles = {
  helperText: (multiline?: boolean) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
    mr: multiline ? '48px' : '14px'
  })
}
