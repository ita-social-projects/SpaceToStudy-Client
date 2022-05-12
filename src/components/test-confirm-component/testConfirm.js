import { useEffect, useState } from 'react'
import useConfirm from '~/hooks/use-confirm'

const Comp = () => {
  const [dirty, setDirty] = useState(false)
  const { setNeedConfirmation } = useConfirm()

  useEffect(() => {
    setNeedConfirmation(dirty)
  }, [dirty, setNeedConfirmation])

  return (
    <div style={ { height: '600px', width: '500px' } }>
      <h1>Hello Space2Study!!!</h1>
      <h1>
        dirty:
        { dirty.toString() }
      </h1>
      <button onClick={ () => setDirty((prev) => !prev) }>
        click
      </button>  
    </div>
    
  )
}

export default Comp
