export interface LessonData {
  title: string
  description: string
  attachments: string[]
}

export interface NewLesson extends LessonData {
  content: string
}
