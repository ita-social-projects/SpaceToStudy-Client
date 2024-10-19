import { commonShadow } from '~/styles/app-theme/custom-shadows'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px',
    mb: '20px',
    boxShadow: commonShadow
  },
  input: {
    sx: { padding: 0, margin: 0 },
    disabled: true
  },
  descriptionInput: {
    sx: {
      mx: '-14px'
    },
    disableUnderline: true
  },
  showBlock: {
    m: 0
  },
  resourceCount: {
    container: {
      pt: '10px',
      px: '60px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    wrapper: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.primary[500]
    },
    icon: {
      fontSize: '16px'
    },
    text: {
      fontSize: '12px'
    }
  },
  divider: {
    py: '8px'
  }
}
