import { useEffect, useState } from 'react'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'

const Comp = () => {
  const [dirty, setDirty] = useState(false)
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  useEffect(() => {
    setNeedConfirmation(dirty)
    setPrompt(dirty)
  }, [dirty, setNeedConfirmation, setPrompt])

  return (
    <div style={ { height: '600px', width: '500px' } }>
      <h1>Hello Space2Study!!!</h1>
      <h1>
        dirty:
        { dirty.toString() }
      </h1>
      <button onClick={ () => setDirty((prev) => !prev) }>click</button>
    </div>
  )
}

export default Comp
