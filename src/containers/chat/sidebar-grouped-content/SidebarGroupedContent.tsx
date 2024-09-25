import AllContentModal from '~/components/all-content-modal/AllContentModal'
import LinkComponent from '~/components/link-component/LinkComponent'

import {
  getFormattedDate,
  getGroupedByDate,
  getIsNewMonth
} from '~/utils/helper-functions'
import { styles } from '~/containers/chat/sidebar-grouped-content/SidebarGroupedContent.styles'
import { File, Link, Media } from '~/types'

interface SidebarGroupedContentProps<T> {
  items: T[]
}

const SidebarGroupedContent = <T extends File | Link | Media>({
  items
}: SidebarGroupedContentProps<T>) => {
  const groupedItems = getGroupedByDate<T>(items, getIsNewMonth)

  const getDate = (date: string) =>
    getFormattedDate({ date, options: { year: 'numeric', month: 'long' } })

  return (
    <>
      {groupedItems.map((group) => (
        <AllContentModal
          key={group.date}
          sx={styles.groupedContent}
          title={getDate(group.date)}
        >
          {group.items.map((item) => (
            <LinkComponent key={item._id} link={item as Link} />
          ))}
        </AllContentModal>
      ))}
    </>
  )
}

export default SidebarGroupedContent
