import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 0
    }
  }
})
