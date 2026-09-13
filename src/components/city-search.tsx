import { useState } from 'react'
import { format } from 'date-fns'
import { Clock, Loader2, Search, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchHistory } from '@/hooks/use-search-history'
import { useSearchLocationsQuery } from '@/hooks/use-weather'

const CitySearch = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce<string>(query)

  const navigate = useNavigate()

  const { data: locations, isLoading } = useSearchLocationsQuery(debouncedQuery)
  const { addToHistory, clearHistory, history } = useSearchHistory()

  const handleSelect = (value: string) => {
    const [lat, lon, name, country, state] = value.split('|')

    addToHistory({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
      state: state && state !== 'undefined' ? state : undefined
    })

    setOpen(false)
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
  }

  return (
    <>
      <Button
        variant='outline'
        className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        onClick={() => setOpen(true)}
      >
        <Search className='mr-2 size-4' /> Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder='Search cities...' value={query} onValueChange={setQuery} />
          <CommandList>
            {query.length > 2 && !isLoading && <CommandEmpty>No results found</CommandEmpty>}
            {/* <CommandGroup heading='Favorites'>
              <CommandItem className='[&_svg]:hidden'>123</CommandItem>
            </CommandGroup> */}
            {history.length > 0 && (
              <>
                <CommandSeparator className='bg-primary' />
                <CommandGroup>
                  <div className='mb-1 flex items-center justify-between pl-1'>
                    <p>Recent Searches</p>
                    <Button
                      title='Clear all'
                      variant='ghost'
                      size='sm'
                      onClick={() => clearHistory()}
                      className='size-fit p-0! hover:opacity-80'
                    >
                      <XCircle className='size-4' />
                    </Button>
                  </div>
                  {history.map((item) => (
                    <CommandItem
                      key={`${item.lat}-${item.lon}`}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}|${item.state && item.state !== 'undefined' ? item.state : ''}|${item.searchedAt}`}
                      onSelect={handleSelect}
                      className='gap-0 [&_svg]:hidden'
                    >
                      <Clock className='mr-2 size-4 text-muted-foreground' />
                      {item.name}
                      {item.state && item.state !== 'undefined' && (
                        <span className='text-sm text-muted-foreground'>, {item.state}</span>
                      )}
                      {item.country && (
                        <span className='text-sm text-muted-foreground'>, {item.country}</span>
                      )}
                      <span className='ml-auto text-xs text-muted-foreground'>
                        {format(item.searchedAt, 'MMM d, h:mm a')}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
            {locations && locations.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading='Suggestions'>
                  {isLoading && (
                    <div className='flex items-center justify-center p-4'>
                      <Loader2 className='size-4 animate-spin' />
                    </div>
                  )}
                  {locations.map((location) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}|${location.state || ''}`}
                      onSelect={handleSelect}
                      className='gap-0 [&_svg]:hidden'
                    >
                      <Search className='mr-2 size-4' />
                      {location.name}
                      {location.state && location.state !== 'undefined' && (
                        <span className='text-sm text-muted-foreground'>, {location.state}</span>
                      )}
                      {location.country && (
                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
export default CitySearch
