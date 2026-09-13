import { cn } from 'cn'
import { format } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WeatherResType } from '@/types/weather.type'

type WeatherDetailsProps = {
  data: WeatherResType
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a')
  }

  const getWinDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

    const index = Math.round(degree / 45) % 8

    return directions[index]
  }

  const details = [
    { title: 'Sun rise', value: formatTime(sys.sunrise), icon: Sunrise, color: 'text-orange-500' },
    { title: 'Sun set', value: formatTime(sys.sunset), icon: Sunset, color: 'text-blue-500' },
    {
      title: 'Wind',
      value: `${wind.speed} m/s ${getWinDirection(wind.deg)}`,
      icon: Compass,
      color: 'text-green-500'
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {details.map((detail) => (
            <div key={detail.title} className='flex items-center gap-3 rounded-lg border p-4'>
              <detail.icon className={cn('size-5', detail.color)} />
              <div className='flex flex-col gap-2'>
                <p className='text-sm leading-none font-bold'>{detail.title}</p>
                <p className='text-sm leading-none font-medium'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default WeatherDetails
