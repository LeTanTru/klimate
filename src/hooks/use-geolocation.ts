import { useEffect, useState } from 'react'
import type { Coord } from '@/types/weather.type'

type GeolocationState = {
  coord: Coord | null
  error: string | null
  isLoading: boolean
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>(() => {
    if (typeof navigator !== 'undefined' && !navigator.geolocation) {
      return {
        coord: null,
        error: 'Geolocation is not supported by your browser',
        isLoading: false
      }
    }
    return {
      coord: null,
      error: null,
      isLoading: true
    }
  })

  const queryPosition = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coord: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          error: null,
          isLoading: false
        })
      },
      (error) => {
        let errorMessage: string

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.'
            break
          default:
            errorMessage = 'An unknown error occurred.'
        }

        setLocation({
          coord: null,
          error: errorMessage,
          isLoading: false
        })
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation({
        coord: null,
        error: 'Geolocation is not supported by your browser',
        isLoading: false
      })
      return
    }
    setLocation((prev) => ({ ...prev, error: null, isLoading: false }))
    queryPosition()
  }

  useEffect(() => {
    queryPosition()
  }, [])

  return {
    ...location,
    getLocation
  }
}
