export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    width: '100%',
    columnGap: '80px',
    alignItems: 'center',
    justifyContent: 'center',
    pt: { xs: '16px', sm: '32px' },
    pb: { xs: '32px', md: '48px' },
    borderBottom: '1px solid',
    borderTop: '1px solid',
    borderColor: 'primary.100'
  },
  progressBar: { display: 'flex', alignItems: 'center', gap: { xs: '12px', sm: '30px' }, my: '12px' },
  linearProgress: {
    height: '12px',
    borderRadius: '6px',
    width: { md: '360px', sm: '240px', xs: '190px' },
    backgroundColor: 'primary.50',
    '& span': { backgroundColor: 'basic.yellow', borderRadius: '6px' }
  }
}
