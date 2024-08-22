export const scrollToAndHighlight = (path: string) => {
  setTimeout(() => {
    const elementWithId = document.getElementById(
      path.split('#').slice(1).join()
    )
    if (elementWithId) {
      // console.log(elementWithId)
      elementWithId.style.backgroundColor = '#ffff0029'
      elementWithId.style.padding = '10px'
      elementWithId.style.transition = '1s ease'

      elementWithId.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // const top = elementWithId.getBoundingClientRect().top
      // console.log(top)
      // document.querySelector('body')!.scrollBy(0, top)

      setTimeout(() => {
        elementWithId.style.backgroundColor = ''
        elementWithId.style.padding = '0'
      }, 1000)
    }
  }, 0)
}
