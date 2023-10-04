import { ChatResponse } from '~/types'

export const isCorrectUser = (item: ChatResponse, userId: string): boolean => {
  const correctUser = item.members.filter(
    (member) => member.user._id !== userId
  )
  return correctUser.length > 0
}

export const filterChats = (
  listOfChats: ChatResponse[],
  userId: string,
  search: string
): ChatResponse[] => {
  const lowerCaseSearch = search.toLocaleLowerCase()
  return listOfChats.filter((item) => {
    if (!isCorrectUser(item, userId)) return false

    const { firstName, lastName } = item.members[0].user
    const fullName = `${firstName} ${lastName}`
    return fullName.toLocaleLowerCase().includes(lowerCaseSearch)
  })
}
