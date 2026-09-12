import { useQuery } from '@tanstack/react-query'
import { weatherAPI } from '@/api/weather'
import type { Coord } from '@/types/weather.type'

export const WEATHER_KEYS = {
  weather: (coord: Coord | null) => ['weather', coord] as const,
  forecast: (coord: Coord | null) => ['forecast', coord] as const,
  reverseGeocode: (coord: Coord | null) => ['reverseGeocode', coord] as const
} as const

export const useWeatherQuery = (coord: Coord | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coord ?? { lat: 0, lon: 0 }),
    queryFn: () => (coord ? weatherAPI.getCurrentWeather(coord) : null),
    enabled: !!coord
  })
}

export const useForecastQuery = (coord: Coord | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coord ?? { lat: 0, lon: 0 }),
    queryFn: () => (coord ? weatherAPI.getForecast(coord) : null),
    enabled: !!coord
  })
}

export const useReverseGeocodeQuery = (coord: Coord | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.reverseGeocode(coord ?? { lat: 0, lon: 0 }),
    queryFn: () => (coord ? weatherAPI.reverseGeocode(coord) : null),
    enabled: !!coord
  })
}
