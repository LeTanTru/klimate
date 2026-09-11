import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import { ThemeProvider } from '@/contexts/theme-provider'
import CityPage from '@/pages/city-page'
import WeatherDashBoard from '@/pages/weather-dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark'>
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashBoard />} />
            <Route path='/city/:cityName' element={<CityPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
