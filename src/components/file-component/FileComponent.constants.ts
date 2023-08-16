import { File, Link } from '~/types'

export const openInNewTab = (component: File | Link) => {
  window.open(component.url, '_blank', 'noopener noreferrer')
}
