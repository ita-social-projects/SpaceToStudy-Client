import { ProfessionalSubject } from '~/types'

export const professionalSubjectTemplate: Omit<ProfessionalSubject, '_id'> = {
  name: '',
  proficiencyLevels: []
}
