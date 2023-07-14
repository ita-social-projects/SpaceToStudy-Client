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
    borderRadius: '10px',
    height: 'fit-content',
    '& .MuiChip-label': {
      p: '7px 14px',
      display: 'block',
      whiteSpace: 'normal'
    }
  },
  paperProps: {
    maxWidth: '410px',
    mr: '15px',
    boxShadow: commonHoverShadow
  }
}
