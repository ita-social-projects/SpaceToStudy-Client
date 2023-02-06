import React from 'react'
import { Link, useHref, useLinkClickHandler } from 'react-router-dom'
import { scrollToHash } from '~/utils/hash-scroll'

const HashLink = ({ onClick, replace = false, state, target, to, ...rest }, ref) => {
  let pathHash = useHref(to)
  const options = { replace, state, target }
  let handleClick = useLinkClickHandler(to, options)

  const scroll = (event) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      handleClick(event)
      scrollToHash(pathHash)
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
