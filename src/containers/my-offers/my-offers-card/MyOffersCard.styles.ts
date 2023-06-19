import { TypographyVariantEnum } from '~/types'

const ellipsisTextStyle = (linesCount: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  container: {
    width: '100%',
    minHeigth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'space-between'
  },
  title: {
    ...ellipsisTextStyle(2),
    typography: TypographyVariantEnum.MidTitle,
    fontWeight: 600,
    color: 'primary.700'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 'auto'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: TypographyVariantEnum.H6
    },
    description: {
      typography: TypographyVariantEnum.Caption
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px'
  }
}
