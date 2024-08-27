export const scrollToAndHighlight = (path: string) => {
  setTimeout(() => {
    const elementWithId = document.getElementById(
      path.split('#').slice(1).join()
    )
    if (elementWithId) {
      // console.log(elementWithId)
      elementWithId.style.position = 'relative'
      elementWithId.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // setTimeout(() => {
      //   elementWithId.style.backgroundColor = ''
      //   elementWithId.style.padding = '0'
      // }, 1000)
    }
  }, 0)
}
