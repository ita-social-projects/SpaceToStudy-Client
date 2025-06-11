export type NoteAction = 'create' | 'delete' | 'update' | 'duplicate'

export const noteActionMap: Record<NoteAction, string> = {
  create: 'cooperationsPage.modalMessages.successCreation',
  delete: 'cooperationsPage.modalMessages.successDeletion',
  duplicate: 'cooperationsPage.modalMessages.successDuplication',
  update: 'cooperationsPage.modalMessages.successUpdating'
}
