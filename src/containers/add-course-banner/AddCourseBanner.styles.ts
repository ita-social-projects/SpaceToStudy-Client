import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: (bannerUrl: string) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    borderRadius: '10px 10px 0px 0px',
    height: '216px',
    backgroundImage: `linear-gradient(0deg, rgba(38, 50, 56, 0.15) 0%, rgba(38, 50, 56, 0.15) 100%), url(${bannerUrl})`,
    '&:hover': {
      backgroundImage: `linear-gradient(0deg, rgba(38, 50, 56, 0.40) 0%, rgba(38, 50, 56, 0.40) 100%), url(${bannerUrl})`
    }
  }),
  description: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'basic.white',
    mt: 1
  },
  titleWithIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
