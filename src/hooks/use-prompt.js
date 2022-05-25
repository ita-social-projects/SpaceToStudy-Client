import { useContext, useEffect, useState } from 'react'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'

const usePrompt = () => {
  const [prompt, setPrompt] = useState(false)
  const { navigator } = useContext(NavigationContext)

  useEffect(() => {
    const unblock = navigator.block()

    if (!prompt) {
      unblock()
    }

    return () => unblock()
  }, [prompt, navigator])

  return { setPrompt }
}

export default usePrompt
