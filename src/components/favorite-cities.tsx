import { Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFavorites } from '@/hooks/use-favorite'
import { useWeatherQuery } from '@/hooks/use-weather'

type FavoriteCityProps = {
  id: string
  name: string
  lat: number
  lon: number
  onRemove: (id: string) => void
}

function FavoriteCity({ id, lat, lon, name, onRemove }: FavoriteCityProps) {
  const navigate = useNavigate()
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon })

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role='button'
      tabIndex={0}
      className='relative flex min-w-62.5 cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all duration-200 ease-linear hover:shadow-md'
    >
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-1 right-1 size-6 rounded-full p-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive'
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id)
          toast.success(`${name} removed from favorites`, {
            position: 'bottom-right'
          })
        }}
      >
        <X className='size-4' />
      </Button>
      {isLoading ? (
        <div className='flex h-8 items-center justify-center'>
          <Loader2 className='size-4 animate-spin' />
        </div>
      ) : weather ? (
        <>
          <div className='flex items-center gap-2'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className='size-8'
            />
            <div>
              <p className='font-medium'>{name}</p>
              <p className='text-xs text-muted-foreground'>{weather.sys.country}</p>
            </div>
          </div>
          <div className='ml auto text-right'>
            <p className='text-xl font-bold'>{Math.round(weather.main.temp)}°C</p>
            <p className='text-xs text-muted-foreground capitalize'>
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  )
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorites()

  if (!favorites || favorites.length === 0) {
    return null
  }

  return (
    <>
      <h1 className='text-xl font-bold tracking-tight'>Favorites</h1>
      <ScrollArea className='mt-4 w-full pb-4'>
        <div className='flex gap-4'>
          {favorites.map((favorite) => (
            <FavoriteCity key={favorite.id} {...favorite} onRemove={removeFavorite} />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
export default FavoriteCities
