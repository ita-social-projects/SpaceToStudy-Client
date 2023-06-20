import { Ref, MouseEvent, forwardRef } from 'react'
import { Link, useHref, useLinkClickHandler, LinkProps } from 'react-router-dom'
import { scrollToHash } from '~/utils/hash-scroll'

const HashLink = (
  { onClick, replace = false, target, to, ...rest }: LinkProps,
  ref: Ref<HTMLAnchorElement>
) => {
  const pathHash = useHref(to)
  const options = { replace, target }
  const handleClick = useLinkClickHandler(to, options)

  const scroll = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      handleClick(event)
      scrollToHash(pathHash)
    }
  }

  return (
    <Link onClick={scroll} ref={ref} target={target} to={pathHash} {...rest} />
  )
}

export default forwardRef(HashLink)
