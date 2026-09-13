import { cn } from 'cn'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/use-favorite'
import type { WeatherResType } from '@/types/weather.type'

type FavoriteButtonProps = {
  data: WeatherResType
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addToFavorite, isFavorite, removeFavorite } = useFavorites()
  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon)

  const handleToggleFavorite = () => {
    if (isCurrentFavorite) {
      removeFavorite(`${data.coord.lat}-${data.coord.lon}`)
      toast.success(`${data.name} removed from favorites`, {
        position: 'bottom-right'
      })
    } else {
      addToFavorite({
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name
      })

      toast.success(`${data.name} added to favorites`, {
        position: 'bottom-right'
      })
    }
  }

  return (
    <Button
      variant={isCurrentFavorite ? 'default' : 'outline'}
      size='icon'
      className={cn({
        'bg-yellow-500 hover:bg-yellow-600': isCurrentFavorite
      })}
      onClick={handleToggleFavorite}
    >
      <Star
        className={cn('size-4', {
          'fill-current': isCurrentFavorite
        })}
      />
    </Button>
  )
}
export default FavoriteButton
