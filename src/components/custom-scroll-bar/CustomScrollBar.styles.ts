export const styles = {
  scrollhostContainer: (height: string, isScroll: boolean) => ({
    position: 'relative',
    height: height,
    '&:hover': {
      '& > div:last-child': {
        opacity: isScroll ? 1 : 0
      }
    }
  }),
  scrollBar: {
    width: '5px',
    height: '100%',
    position: 'absolute',
    right: '7px',
    top: 0,
    bottom: 0,
    borderRadius: '7px',
    transition: 'all .3s',
    opacity: 0,
    backgroundColor: 'basic.pastelgrey'
  },
  scrollThumb: (height: number, top: number) => ({
    height: `${height}px`,
    transform: `translateY(${top}px)`,
    borderRadius: '3px',
    backgroundColor: 'basic.steelgrey'
  }),

  scrollhost: {
    height: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
}
