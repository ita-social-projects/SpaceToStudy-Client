import { alpha } from '@mui/material/styles'
import palette from '~/styles/app-theme/app.pallete'
import { StatusEnum, TypographyVariantEnum } from '~/types'

const statusColors = {
  [StatusEnum.Pending]: palette.basic.blue,
  [StatusEnum.Active]: palette.success[600],
  [StatusEnum.Closed]: palette.primary[400],
  [StatusEnum.Draft]: palette.basic.blue,
  [StatusEnum.NeedAction]: palette.error[600]
}

export const styles = (status: StatusEnum) => ({
  root: {
    backgroundColor: alpha(statusColors[status], 0.2),
    py: 0,
    border: '1px solid',
    borderColor: statusColors[status],
    cursor: 'inherit'
  },
  label: { display: 'flex', gap: '5px', alignItems: 'center' },
  dot: {
    backgroundColor: statusColors[status],
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  status: {
    typography: TypographyVariantEnum.Overline,
    lineHeight: '14px',
    color: statusColors[status]
  }
})
