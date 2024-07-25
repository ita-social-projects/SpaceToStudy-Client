import { ProfessionalCategory, SubjectNameInterface } from '~/types'

export const professionalSubjectTemplate: SubjectNameInterface = {
  _id: '',
  name: ''
}

export const userMainSubjectTemplate: ProfessionalCategory = {
  category: { _id: '', name: '', appearance: { color: '', icon: '' } },
  subjects: [professionalSubjectTemplate]
}
