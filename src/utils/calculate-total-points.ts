interface Answer {
  isCorrect: boolean
  isChosen: boolean
  points?: number
}

interface Result {
  answers?: Answer[]
}

export const calculateTotalPoints = (results: Result[] = []) => {
  return results.reduce((total, { answers = [] }) => {
    const chosen = answers.find((answer) => answer.isChosen)

    if (!chosen) return total

    if (typeof chosen.points === 'number') {
      return total + chosen.points
    }

    return chosen.isCorrect ? total + 1 : total
  }, 0)
}
