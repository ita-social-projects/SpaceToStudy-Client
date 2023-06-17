const ellipsisTextStyle = (linesCount) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  bio: {
    ...ellipsisTextStyle(2),
    mb: '10px'
  },
  title: {
    color: 'primary.700',
    ...ellipsisTextStyle(3)
  },
  chipContainer: {
    my: '10px'
  },
  description: {
    ...ellipsisTextStyle(4),
    color: 'primary.600',
    mb: '10px'
  }
}
