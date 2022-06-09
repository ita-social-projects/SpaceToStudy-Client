import React from 'react'
import { Link, useHref, useLinkClickHandler } from 'react-router-dom'


const HashLink = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    },
    ref
  ) => {
    let pathHash = useHref(to)
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    })

    const clickRoute = (event) => {
      onClick?.(event)
      if (!event.defaultPrevented) {
        handleClick(event)
        setTimeout(() => {
          const elementWithId = document.getElementById(pathHash.split('#').slice(1).join())
          elementWithId.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      }
    }
        
    return (
      <Link
        { ...rest }
        onClick={ clickRoute }
        ref={ ref }
        target={ target }
        to={ pathHash }
      />
    )
  }
)

HashLink.displayName = 'HashLink'

export default HashLink
