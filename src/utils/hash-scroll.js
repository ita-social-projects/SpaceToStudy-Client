export const scrollToHash = (path) => {
  setTimeout(() => {
    const elementWithId = document.getElementById(
      path.split('#').slice(1).join()
    )
    elementWithId && elementWithId.scrollIntoView({ behavior: 'smooth' })
  }, 0)
}
