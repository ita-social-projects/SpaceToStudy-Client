import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '~/pages/home/Home'

import MockAdapter from 'axios-mock-adapter'

import { URLs } from '~/constants/request'
import { request } from '~/plugins/request'

const mock = new MockAdapter(request)

describe('Home page test', () => {
  it('should have title text', async () => {
    const items = [{ title: 'test', _id: 'test1' }]

    mock.onGet(URLs.example.get).reply(200, { items })
    render(
      <Home />
    )
    const loadingText = screen.getByText('Loading')
    expect(loadingText).toBeInTheDocument()

    const linkElement = screen.getByText('common.title')
    expect(linkElement).toBeInTheDocument()

    await waitForElementToBeRemoved(loadingText)

    items.forEach((item) =>
      expect(screen.getByText(item.title)).toBeInTheDocument()
    )
  })
})
