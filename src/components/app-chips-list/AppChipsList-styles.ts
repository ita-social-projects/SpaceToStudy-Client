import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  feature: {
    display: 'flex',
    direction: 'row',
    gap: '10px',
    flexWrap: 'wrap',
    maxHeight: '130px',
    overflowX: 'auto'
  },
  initialItemsWrapperStyle: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  deleteButton: {
    p: 0
  },
  chip: {
    backgroundColor: 'basic.grey',
    color: 'primary.700',
    typography: 'subtitle2',
    py: { md: '17px' },
    borderRadius: '10px'
  },
  paperProps: {
    maxWidth: '410px',
    mr: '15px',
    boxShadow: commonHoverShadow
  }
}
