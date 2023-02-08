export const styles = {
  wrapper: {
    padding: { xs: '14px 16px', sm: '44px' },
    backgroundColor: 'primary.50',
    borderRadius: '8px',
    boxShadow: 'none',
    '& .MuiAccordionSummary-root': {
      padding: 0
    },
    '& .MuiAccordionSummary-content': {
      flexDirection: 'column',
      margin: 0,
      cursor: 'default'
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0
    }
  },
  headerProgressBar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  title: {
    marginRight: '18px',
    fontSize: { xs: '16px', sm: '24px' },
    lineHeight: { xs: '24px', sm: '36px' }
  },
  subtitle: {
    fontWeight: { xs: '400', sm: '500' }
  },
  profileItems: {
    marginTop: { xs: '20px', sm: '40px' },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', sm: '10px' },
    padding: 0
  }
}
