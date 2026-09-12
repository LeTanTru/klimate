import { API_CONFIG } from '@/api/config'
import type { Coord, ForecastResType, GeocodeResType, WeatherResType } from '@/types/weather.type'

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string>): string {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params
    })

    return `${endpoint}?${searchParams.toString()}`
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<T>
  }

  async getCurrentWeather({ lat, lon }: Coord): Promise<WeatherResType> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units
    })

    return this.fetchData<WeatherResType>(url)
  }

  async getForecast({ lat, lon }: Coord): Promise<ForecastResType> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units
    })

    return this.fetchData<ForecastResType>(url)
  }

  async reverseGeocode({ lat, lon }: Coord): Promise<GeocodeResType[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units
    })

    return this.fetchData<GeocodeResType[]>(url)
  }
}

export const weatherAPI = new WeatherAPI()
