import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import CurrentWeather from '@/components/current-weather'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import WeatherDetails from '@/components/weather-detailts'
import WeatherForeCast from '@/components/weather-forecast'
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather'

const CityPage = () => {
  const params = useParams<{ cityName: string }>()
  const [searchParams] = useSearchParams()
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')

  const coord = { lat, lon }

  const weatherQuery = useWeatherQuery(coord)
  const forecastQuery = useForecastQuery(coord)

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='size-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />
  }

  return (
    <>
      {/* Favorite Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>Favorite Button</div>
      </div>

      {/* Current and Hourly weather */}
      <div className='mt-4 grid gap-6'>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <CurrentWeather data={weatherQuery.data} />
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
export default CityPage
