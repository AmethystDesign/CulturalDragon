import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteInfo } from '@/app/siteConfig';
import { cn } from '@/lib/utils';

const SearchForm = ({query}: { query?: string}) => {
  const placeHolder = cn("Search", siteInfo.siteScope)
  return (
    <Form action="/" scroll={false} className='search-form'>
      <input
        name="query"
        defaultValue={query}
        className='search-input'
        placeholder= {placeHolder}  // Search Works
      />

      <div className='flex gap-2'>
        {query && <SearchFormReset />}
        <Button type="submit" className='search-btn text-white'>
          <Search className='size-5'/>
        </Button>
      </div>
    </Form>
  )
}

export default SearchForm