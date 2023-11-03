import AllContentModal from '~/components/all-content-modal/AllContentModal'
import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'
import FileComponent from '~/components/file-component/FileComponent'
import LinkComponent from '~/components/link-component/LinkComponent'

import {
  getFormattedDate,
  getGroupedByDate,
  getIsNewMonth
} from '~/utils/helper-functions'
import { styles } from '~/containers/chat/sidebar-grouped-content/SidebarGroupedContent.styles'
import { File, Link, Media, SidebarContentEnum } from '~/types'

interface SidebarGroupedContentProps<T> {
  items: T[]
  type: SidebarContentEnum
}

const SidebarGroupedContent = <T extends File | Link | Media>({
  items,
  type
}: SidebarGroupedContentProps<T>) => {
  const groupedItems = getGroupedByDate<T>(items, getIsNewMonth)

  const getDate = (date: string) =>
    getFormattedDate({ date, options: { year: 'numeric', month: 'long' } })

  const getContentByType = (item: T) =>
    type === SidebarContentEnum.Files ? (
      <FileComponent file={item as File} key={item._id} />
    ) : (
      <LinkComponent key={item._id} link={item as Link} />
    )

  return (
    <>
      {groupedItems.map((group) => (
        <AllContentModal
          key={group.date}
          sx={styles.groupedContent}
          title={getDate(group.date)}
        >
          {type === SidebarContentEnum.Media ? (
            <SidebarImageGrid
              compactMode={false}
              images={group.items as Media[]}
            />
          ) : (
            group.items.map((item) => getContentByType(item))
          )}
        </AllContentModal>
      ))}
    </>
  )
}

export default SidebarGroupedContent
