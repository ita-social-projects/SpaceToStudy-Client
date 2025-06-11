import { type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient, testQueryClient } from '~/plugins/queryClient'

type QueryProviderProps = {
  children: ReactNode
  testMode?: boolean
}

const QueryProvider: React.FC<QueryProviderProps> = ({
  children,
  testMode = false
}) => {
  return (
    <QueryClientProvider client={testMode ? testQueryClient : queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
