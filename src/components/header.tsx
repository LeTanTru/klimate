import { cn } from 'cn'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/contexts/theme-provider'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleToggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to='/'>
          <img
            src={theme === 'dark' ? '/dark-logo.png' : '/light-logo.png'}
            alt='Klimate Logo'
            className='h-14'
          />
        </Link>

        <div
          className={cn(
            'flex cursor-pointer items-center transition transition-transform duration-500',
            {
              'rotate-180': isDarkMode,
              'rotate-0': !isDarkMode
            }
          )}
        >
          <button onClick={handleToggleTheme} className='size-6'>
            {isDarkMode ? <Sun className='text-yellow-500' /> : <Moon className='text-blue-500' />}
          </button>
        </div>
      </div>
    </header>
  )
}
export default Header
