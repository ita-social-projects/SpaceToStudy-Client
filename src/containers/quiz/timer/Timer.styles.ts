import { theme } from '~/styles/app-theme/custom-mui.styles'
import palette from '~/styles/app-theme/app.pallete'

const styles = {
  chip: {
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1),
    borderWidth: '1px',
    borderRadius: '12px'
  },
  successChip: {
    backgroundColor: 'var(--s2s-green-100)',
    borderColor: 'var(--s2s-green-600)'
  },
  errorChip: {
    backgroundColor: 'var(--s2s-red-50)',
    borderColor: 'var(--s2s-red-500)'
  },
  label: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px',
    width: '84px'
  },
  successLabel: {
    color: 'var(--s2s-green-800)'
  },
  errorLabel: {
    color: 'var(--s2s-red-800)'
  },
  successTimer: {
    fill: palette.success[800]
  },
  errorTimer: {
    fill: 'var(--s2s-red-500)'
  }
}

export default styles
