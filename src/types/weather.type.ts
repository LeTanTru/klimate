export type Coord = {
  lon: number
  lat: number
}
export type WeatherResType = {
  coord: Coord
  weather: { id: number; main: string; description: string; icon: string }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: { '1h': number }
  clouds: { all: number }
  dt: number
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number }
  timezone: number
  id: number
  name: string
  cod: number
}

export type ForecastResType = {
  cod: string
  message: number
  cnt: number
  list: {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: { id: number; main: string; description: string; icon: string }[]
    clouds: { all: number }
    wind: { speed: number; deg: number; gust: number }
    visibility: number
    pop: number
    rain?: { '3h': number }
    sys: { pod: string }
    dt_txt: string
  }[]
  city: {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export type GeocodeResType = {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}
