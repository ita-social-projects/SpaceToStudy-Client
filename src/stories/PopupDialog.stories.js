import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { MemoryRouter } from 'react-router-dom'
import { ModalContext, ModalProvider } from '~/context/modal-context'
import { useContext } from 'react'

export default {
  title: 'PopupDialog',
  component: PopupDialog,
  argTypes: {
    content: {
      type: 'string',
      description: 'Content component'
    }
  }
}

export const Desktop = ({ content }) => {
  const { setModal } = useContext(ModalContext)

  const openDialog = () => {
    setModal(<div style={{ width: '400px', height: '200px' }}>{content}</div>)
  }

  return <button onClick={openDialog}>Open modal</button>
}

Desktop.decorators = [
  (Story) => (
    <MemoryRouter>
      <ModalProvider>
        <Story />
      </ModalProvider>
    </MemoryRouter>
  )
]

Desktop.args = {
  content: 'Here you can pass your component'
}
