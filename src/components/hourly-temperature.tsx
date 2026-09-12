import { format } from 'date-fns'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ForecastResType } from '@/types/weather.type'

type HourlyTemperatureProps = {
  data: ForecastResType
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), 'ha'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }))

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-50 w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart width={400} height={400} data={chartData}>
              <XAxis
                dataKey='time'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}°C`}
                padding={{ top: 10, bottom: 10 }}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='rounded-lg border bg-background p-2 shadow-sm'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='flex flex-col'>
                            <span className='text-xs text-muted-foreground uppercase'>
                              Temperature&nbsp;
                            </span>
                            <span className='font-bold'>{payload[0].value}°C</span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-xs text-muted-foreground uppercase'>
                              Feels like&nbsp;
                            </span>
                            <span className='font-bold'>{payload[1].value}°C</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line type='monotone' dataKey='temp' stroke='#2563eb' strokeWidth={2} dot={false} />
              <Line
                type='monotone'
                dataKey='feels_like'
                stroke='#64748b'
                strokeWidth={2}
                dot={false}
                strokeDasharray='5 5'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
export default HourlyTemperature
