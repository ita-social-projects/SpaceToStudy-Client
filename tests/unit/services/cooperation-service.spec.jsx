import {
  cooperationService,
  CooperationNotesService
} from '~/services/cooperation-service'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const id = '64kf41f7806a06c65338c509'
const lessonId = '64ef41f7806a06c65338c433'
const noteId = '64dc92f7806a06c65338b712'

const creationData = {
  offer: '64ef92a7806a06c65338d123',
  receiver: '64bf81c7806a06c65338f456',
  receiverRole: 'tutor'
}

const updateResourceStatus = {
  id,
  resourceId: lessonId,
  completionStatus: 'completed'
}

const noteData = {
  isPrivate: false,
  text: 'This is Note'
}

describe('Cooperation Service tests', () => {
  afterEach(() => {
    mockAxiosClient.resetHistory()
    mockAxiosClient.reset()
  })

  it('should create new cooperation', async () => {
    mockAxiosClient.onPost(URLs.cooperations.create).reply(200)

    await cooperationService.createCooperation(creationData)

    expect(mockAxiosClient.history.post[0].url).toBe(URLs.cooperations.create)
    expect(mockAxiosClient.history.post[0].data).toBe(
      JSON.stringify(creationData)
    )
  })

  it('should update resource completion status', async () => {
    mockAxiosClient
      .onPatch(
        URLs.cooperations.updateStatusById
          .replace(':id', id)
          .replace(':resourceId', lessonId)
      )
      .reply(200)

    await cooperationService.updateResourceCompletionStatus(
      updateResourceStatus
    )

    expect(mockAxiosClient.history.patch[0].url).toBe(
      URLs.cooperations.updateStatusById
        .replace(':id', id)
        .replace(':resourceId', lessonId)
    )
    expect(mockAxiosClient.history.patch[0].data).toEqual(
      JSON.stringify({
        completionStatus: updateResourceStatus.completionStatus
      })
    )
  })
})

describe('Cooperation Notes Service tests', () => {
  afterEach(() => {
    mockAxiosClient.resetHistory()
    mockAxiosClient.reset()
  })

  it('should get notes', async () => {
    mockAxiosClient
      .onGet(new RegExp(`${URLs.cooperations.get}/${id}${URLs.notes.get}`))
      .reply(200)

    await CooperationNotesService.getNotes(id)

    expect(mockAxiosClient.history.get[0].url).toBe(
      `${URLs.cooperations.get}/${id}${URLs.notes.get}`
    )
  })

  it('should create note', async () => {
    mockAxiosClient
      .onPost(new RegExp(`${URLs.cooperations.get}/${id}${URLs.notes.create}`))
      .reply(200)

    await CooperationNotesService.createNote(noteData, id)

    expect(mockAxiosClient.history.post[0].url).toBe(
      `${URLs.cooperations.get}/${id}${URLs.notes.create}`
    )

    expect(mockAxiosClient.history.post[0].data).toEqual(
      JSON.stringify(noteData)
    )
  })

  it('should update note', async () => {
    mockAxiosClient
      .onPatch(
        new RegExp(
          `${URLs.cooperations.update}/${id}${URLs.notes.update}/${noteId}`
        )
      )
      .reply(200)

    await CooperationNotesService.updateNote(id, noteId, noteData)

    expect(mockAxiosClient.history.patch[0].url).toBe(
      `${URLs.cooperations.update}/${id}${URLs.notes.update}/${noteId}`
    )

    expect(mockAxiosClient.history.patch[0].data).toEqual(
      JSON.stringify(noteData)
    )
  })

  it('should delete note', async () => {
    mockAxiosClient
      .onDelete(
        new RegExp(
          `${URLs.cooperations.delete}/${id}${URLs.notes.delete}/${noteId}`
        )
      )
      .reply(200)

    const result = await CooperationNotesService.deleteNote(id, noteId)

    expect(mockAxiosClient.history.delete[0].url).toBe(
      `${URLs.cooperations.delete}/${id}${URLs.notes.delete}/${noteId}`
    )
    expect(result.data).toBeUndefined()
  })
})
