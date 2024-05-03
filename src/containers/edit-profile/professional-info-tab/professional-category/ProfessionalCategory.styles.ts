import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

const { Body2, Overline, Caption } = TypographyVariantEnum

export const styles = {
  root: (isActivated: boolean) => ({
    border: `1px solid ${
      isActivated ? palette.primary[300] : palette.primary[100]
    }`,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 1,
    px: 2,
    py: 4
  }),
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
        fill: palette.primary[700]
      }
    }
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  divider: {
    my: 1
  },
  subjects: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      columnGap: 3,
      rowGap: 5
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      columnGap: 1,
      rowGap: 2
    }
  },
  card: {
    root: (isActivated: boolean) => ({
      m: 0,
      ...(!isActivated && { color: palette.primary[200] })
    }),
    item: {
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      m: 0,
      columnGap: 3,
      rowGap: 1,
      label: {
        flex: 1,
        typography: Overline,
        lineHeight: '20px'
      },
      value: {
        flex: 2.5,
        typography: Body2
      }
    }
  }
}
