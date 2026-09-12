import { format } from 'date-fns'
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ForecastResType } from '@/types/weather.type'

type WeatherDetailsProps = {
  data: ForecastResType
}

type DailyForecast = {
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  weather: {
    main: string
    description: string
    icon: string
  }
  date: number
}

const WeatherForeCast = ({ data }: WeatherDetailsProps) => {
  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd')

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt
        }
      } else {
        acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min)
        acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max)
      }

      return acc
    },
    {} as Record<string, DailyForecast>
  )

  const nextDays = Object.values(dailyForecasts).slice(0, 6)

  const formatTemp = (temp: number) => `${Math.round(temp)}°C`

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {nextDays.map((day) => (
            <div
              key={day.date}
              className='grid grid-cols-3 items-center gap-4 rounded-lg border p-4'
            >
              <div>
                <p className='font-medium'>{format(new Date(day.date * 1000), 'EEE, MMM d')}</p>
                <p className='text-sm text-muted-foreground capitalize'>
                  {day.weather.description}
                </p>
              </div>
              <div className='flex justify-center gap-4'>
                <span className='flex items-center text-blue-500'>
                  <ArrowDown className='mr-1 size-4' />
                  {formatTemp(day.temp_min)}
                </span>
                <span className='flex items-center text-red-500'>
                  <ArrowUp className='mr-1 size-4' />
                  {formatTemp(day.temp_max)}
                </span>
              </div>
              <div className='flex justify-center gap-4'>
                <span className='flex items-center'>
                  <Droplets className='mr-1 size-4 text-blue-500' />
                  {formatTemp(day.humidity)}
                </span>
                <span className='flex items-center'>
                  <Wind className='mr-1 size-4 text-blue-500' />
                  {formatTemp(day.wind)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default WeatherForeCast
