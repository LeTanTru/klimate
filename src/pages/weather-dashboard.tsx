import { cn } from 'cn'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'
import CurrentWeather from '@/components/current-weather'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/weather-detailts'
import WeatherForeCast from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'

const WeatherDashBoard = () => {
  const { coord, error, getLocation, isLoading } = useGeolocation()

  const weatherQuery = useWeatherQuery(coord)
  const forecastQuery = useForecastQuery(coord)
  const locationQuery = useReverseGeocodeQuery(coord)

  const handleRefresh = () => {
    getLocation()

    if (coord) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  if (isLoading) {
    return <WeatherSkeleton />
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='size-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{error}</p>
          <Button onClick={getLocation} variant='outline' className='w-fit'>
            <MapPin className='mr-2 size-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!coord) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='size-4' />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable location services to view your weather.</p>
          <Button onClick={getLocation} variant='outline' className='w-fit'>
            <MapPin className='mr-2 size-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const location = locationQuery.data?.[0]

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='size-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant='outline' className='w-fit'>
            <RefreshCw className='mr-2 size-4' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  return (
    <>
      {/* Favorite Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant='outline'
          size='icon'
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={cn('size-4', {
              'animate-spin': weatherQuery.isFetching || forecastQuery.isFetching
            })}
          />
        </Button>
      </div>

      {/* Current and Hourly weather */}
      <div className='mt-4 grid gap-6'>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <CurrentWeather data={weatherQuery.data} location={location} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className='grid items-start gap-6 md:grid-cols-2'>
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForeCast data={forecastQuery.data} />
        </div>
      </div>
    </>
  )
}
export default WeatherDashBoard
