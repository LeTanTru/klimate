import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/components/query-provider'
import { useLocalStorage } from '@/hooks/use-local-storage'

type SearchHistory = {
  id: string
  query: string
  lat: number
  lon: number
  name: string
  country: string
  state?: string
  searchedAt: number
}

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<SearchHistory[]>('search-history', [])

  const historyQuery = useQuery({
    queryKey: ['search-history'],
    queryFn: () => history,
    initialData: history
  })

  const addToHistory = useMutation({
    mutationFn: async (search: Omit<SearchHistory, 'id' | 'searchedAt'>) => {
      const newSearch: SearchHistory = {
        ...search,
        state: search.state && search.state !== 'undefined' ? search.state : undefined,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now()
      }

      const filteredHistory = history.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      )

      const newHistory = [newSearch, ...filteredHistory].slice(0, 10) // Keep only the last 10 searches

      setHistory(newHistory)

      return newHistory
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(['search-history'], newHistory)
    }
  })

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([])
      return []
    },
    onSuccess: () => {
      queryClient.setQueryData(['search-history'], [])
    }
  })

  return {
    history: historyQuery.data || [],
    addToHistory: addToHistory.mutate,
    clearHistory: clearHistory.mutate
  }
}
