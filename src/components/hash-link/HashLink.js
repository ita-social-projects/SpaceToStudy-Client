import React from 'react'
import { Link, useHref, useLinkClickHandler } from 'react-router-dom'

const HashLink = ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
  let pathHash = useHref(to)
  const options = { replace, state, target }
  let handleClick = useLinkClickHandler(to, options)

  const scroll = (event) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      handleClick(event)
      setTimeout(() => {
        const elementWithId = document.getElementById(pathHash.split('#').slice(1).join())
        elementWithId && elementWithId.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }
  }

  return (
    <Link
      onClick={ scroll } ref={ ref } target={ target }
      to={ pathHash } { ...rest }
    />
  )
}

HashLink.displayName = 'HashLink'

export default React.forwardRef(HashLink)
