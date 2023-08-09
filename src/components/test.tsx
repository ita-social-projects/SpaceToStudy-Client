import React from 'react'

const fakeRequest = () =>
  new Promise((r) =>
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
          if (Math.round((i + j) % 2) == 0) {
            console.log('i: %d, j: %d', i, j)
          }
        }
      }
      r('ok')
    }, 5000)
  )
const TestComponent = () => {
  const items = [1, 2, 3, 4, 5]

  const makeFakeRequest = () => fakeRequest()

  React.useEffect(() => {
    void makeFakeRequest()
  })

  return (
    <React.Fragment>
      {items.forEach((item) => (
        <p>{item}</p>
      ))}
    </React.Fragment>
  )
}

export default TestComponent
