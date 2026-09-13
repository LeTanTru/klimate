import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from '@/components/layout'
import WeatherSkeleton from '@/components/loading-skeleton'
import { QueryProvider } from '@/components/query-provider'
import { ThemeProvider } from '@/contexts/theme-provider'

const WeatherDashBoard = lazy(() => import('@/pages/weather-dashboard'))
const CityPage = lazy(() => import('@/pages/city-page'))

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <Suspense fallback={<WeatherSkeleton />}>
              <Routes>
                <Route path='/' element={<WeatherDashBoard />} />
                <Route path='/city/:cityName' element={<CityPage />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
