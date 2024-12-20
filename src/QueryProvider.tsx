import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from '~/plugins/queryClient'

type QueryProviderProps = {
  children: ReactNode
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
