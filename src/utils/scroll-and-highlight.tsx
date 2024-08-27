export const scrollToAndHighlight = (
  path: string,
  isIncreasedHeight: boolean = true
) => {
  setTimeout(() => {
    const elementWithId = document.getElementById(
      path.split('#').slice(1).join()
    )
    const highlightedElement = elementWithId?.querySelectorAll('div')[0]

    if (elementWithId && highlightedElement) {
      elementWithId.style.position = 'relative'
      highlightedElement.style.visibility = 'visible'
      highlightedElement.style.transform = 'scale(1.05, 1.23)'
      if (isIncreasedHeight) {
        highlightedElement.style.bottom = '18px'
      }

      elementWithId.scrollIntoView({ behavior: 'smooth', block: 'center' })

      setTimeout(() => {
        highlightedElement.style.transform = 'scale(1.01)'
        highlightedElement.style.visibility = 'hidden'
      }, 2500)
    }
  }, 0)
}
