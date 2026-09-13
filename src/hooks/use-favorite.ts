import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/components/query-provider'
import { useLocalStorage } from '@/hooks/use-local-storage'

type FavoriteCity = {
  id: string
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  addedAt: number
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('favorites', [])

  const favoriteQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity
  })

  const addToFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, 'id' | 'addedAt'>) => {
      const newFavorite: FavoriteCity = {
        ...city,
        state: city.state && city.state !== 'undefined' ? city.state : undefined,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now()
      }

      const exists = favorites.some((fav) => fav.id === newFavorite.id)
      if (exists) return favorites

      const newFavorites = [newFavorite, ...favorites].slice(0, 10)

      setFavorites(newFavorites)

      return newFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      })
    }
  })

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((fav) => fav.id !== cityId)
      setFavorites(newFavorites)

      return newFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      })
    }
  })

  return {
    favorites: favoriteQuery.data || [],
    addToFavorite: addToFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    isFavorite: (lat: number, lon: number) =>
      favorites.some((fav) => fav.lat === lat && fav.lon == lon)
  }
}
