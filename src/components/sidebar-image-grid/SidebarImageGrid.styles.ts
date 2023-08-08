import { TypographyVariantEnum } from '~/types'

export const styles = {
  imageGrid: {
    display: 'flex',
    gap: '13px',
    px: '16px',
    justifyContent: 'start'
  },
  imageWrapper: {
    m: '20px 10px'
  },
  modalImage: {
    width: '100%',
    borderRadius: '5px'
  },
  expansiveGrid: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  expansiveImage: {
    width: '95px',
    height: '95px'
  },
  dateText: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.700',
    p: '4px 16px'
  }
}
