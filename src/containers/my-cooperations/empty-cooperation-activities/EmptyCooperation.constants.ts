import { UserRoleEnum } from '~/types'

export const componentDescription: Partial<
  Record<UserRoleEnum, Array<{ text: string; isSpan?: boolean }>>
> = {
  [UserRoleEnum.Tutor]: [
    { text: 'existingCourse' },
    { text: 'courseTemplate', isSpan: true },
    { text: 'resourceLibrary' },
    { text: 'module', isSpan: true },
    { text: 'fillThis' },
    { text: 'lessons', isSpan: true },
    { text: 'or' },
    { text: 'quizzes', isSpan: true },
    { text: 'resourcesLibrary', isSpan: true }
  ],
  [UserRoleEnum.Student]: [
    { text: 'seems' },
    { text: 'noActivities', isSpan: true },
    { text: 'engageTutor' }
  ]
}
