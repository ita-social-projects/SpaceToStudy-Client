import React from 'react'

const fakeRequest = () => new Promise((r) => setTimeout(r, 5000))
const TestComponent = () => {
  const items = [1, 2, 3, 4, 5]

  const makeFakeRequest = () => fakeRequest()

  React.useEffect(() => {
    makeFakeRequest()
  })

  return (
    <React.Fragment>
      {items.forEach((item) => (
        <p>{item}</p>
      ))
      }
    </React.Fragment>
  )
}

export default TestComponent
