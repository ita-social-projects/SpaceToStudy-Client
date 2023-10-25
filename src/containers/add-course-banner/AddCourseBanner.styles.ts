export const getStyles = (bannerUrl: string) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    borderRadius: '10px 10px 0px 0px',
    px: { md: 7, sm: 3, xs: 3 },
    py: { md: 6, sm: 4, xs: 4 },
    height: '216px',
    backgroundImage: `linear-gradient(0deg, rgba(38, 50, 56, 0.15) 0%, rgba(38, 50, 56, 0.15) 100%), url(${bannerUrl})`,
    '&:hover': {
      backgroundImage: `linear-gradient(0deg, rgba(38, 50, 56, 0.40) 0%, rgba(38, 50, 56, 0.40) 100%), url(${bannerUrl})`
    }
  },
  description: {
    typography: 'subtitle2',
    color: 'basic.white',
    marginTop: '8px'
  },
  titleWithIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
