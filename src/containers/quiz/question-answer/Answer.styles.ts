type AnswerState = 'correct' | 'incorrect'

interface Params {
  state?: AnswerState
  isOpenAnswer?: boolean
}

export const styles = ({ state, isOpenAnswer }: Params) => {
  const bgcolor = state && (state === 'correct' ? 'success.50' : 'error.50')
  const color = state && (state === 'correct' ? 'success.main' : 'error.main')

  return {
    root: {
      p: isOpenAnswer ? undefined : '4px 12px 7px 3px',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      bgcolor
    },
    label: {
      m: '0px',
      flex: '1'
    },
    icon: {
      color
    }
  }
}
