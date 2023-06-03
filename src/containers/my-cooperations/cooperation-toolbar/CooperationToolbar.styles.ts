export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { xs: '14px', sm: '40px' },
    flexDirection: { xs: 'column', sm: 'row' },
    mb: '20px'
  },
  searchIcon: { color: 'primary.700' },
  input: {
    flex: 1,
    maxWidth: '580px',
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '6px'
  },
  actionBlock: { display: 'flex', gap: '24px' },
  select: { flex: { xs: 1, sm: 0 } }
}
