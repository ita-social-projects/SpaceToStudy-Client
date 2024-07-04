import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'
import { alpha, darken } from '@mui/material'

const { Body2, Overline, Caption } = TypographyVariantEnum

export const styles = {
  root: {
    border: `1px solid ${palette.primary[300]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
    borderRadius: 1,
    p: 3
  },
  createBtnContainer: {
    my: 3
  },
  toolbar: {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    },
    deactivateButtonTooltip: {
      whiteSpace: 'pre-line',
      typography: Caption
    },
    deleteButton: {
      svg: {
        fill: palette.primary[900],
        width: '20px',
        height: '20px'
      },
      '&:disabled': { svg: { fill: palette.primary[200] } }
    }
  },
  subjectChipLabel: (color: string) => ({
    typography: Overline,
    fontWeight: '500',
    lineHeight: 1.2,
    color: darken(color, 0.6)
  }),
  subjectChip: (color: string) => ({
    backgroundColor: alpha(color, 0.6)
  }),
  categoryIcon: (color: string) => ({
    width: '24px',
    height: '24px',
    color: color
  }),
  description: {
    grid: {
      m: 0,
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
      gridTemplateRows: 'minmax(24px, auto)',
      rowGap: 2,
      columnGap: 3
    },
    label: {
      typography: Body2,
      color: palette.basic.blueGray,
      lineHeight: '24px',
      alignSelf: 'start'
    },
    value: {
      typography: Body2,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px'
    }
  }
}
