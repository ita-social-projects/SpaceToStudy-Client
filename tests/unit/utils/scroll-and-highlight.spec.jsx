import { beforeEach } from 'vitest'
import { scrollToAndHighlight } from '~/utils/scroll-and-highlight'

const createMockElement = (id) => {
  const element = document.createElement('div')
  element.id = id
  const childDiv = document.createElement('div')
  element.appendChild(childDiv)
  document.body.appendChild(element)

  return { element, childDiv }
}

describe('Scroll to element and highlight it', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should scroll to element and highlight it', async () => {
    const { element, childDiv } = createMockElement('some-element')

    element.scrollIntoView = vi.fn()

    scrollToAndHighlight('url#some-element', true)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(element.style.position).toBe('relative')
    expect(childDiv.style.visibility).toBe('visible')
    expect(childDiv.style.transform).toBe('scale(1.05, 1.23)')
    expect(childDiv.style.bottom).toBe('18px')

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center'
    })
  })

  it('should hide the highlight after timeout', async () => {
    vi.useFakeTimers()
    const { element, childDiv } = createMockElement('some-element')

    element.scrollIntoView = vi.fn()

    scrollToAndHighlight('#some-element', true)

    vi.runAllTimers()

    expect(childDiv.style.transform).toBe('scale(1.01)')
    expect(childDiv.style.visibility).toBe('hidden')
  })
})
