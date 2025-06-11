import type { Result, Answer } from '~/types'

export function getFirstAnswer(
  results: Result[] | undefined,
  questionText: string
): Answer | null {
  return (
    results?.find((res) => res.question === questionText)?.answers?.[0] ?? null
  )
}
