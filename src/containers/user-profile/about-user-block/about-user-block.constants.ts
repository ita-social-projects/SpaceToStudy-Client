import { AboutStudentData, ProfessionalBlock } from '~/types'

export const aboutStudentKeys: Array<keyof AboutStudentData> = [
  'personalIntroduction',
  'learningGoals',
  'learningActivities'
]

export const aboutStudentData: AboutStudentData = {
  personalIntroduction: 'Test personal introduction.',
  learningGoals:
    'My primary goal is to become proficient in Python programming within the next six months, focusing on data analysis and automation.',
  learningActivities: 'Some learning activities.'
}

export const aboutTutorKeys: Array<keyof ProfessionalBlock> = [
  'education',
  'workExperience',
  'scientificActivities',
  'awards'
]
