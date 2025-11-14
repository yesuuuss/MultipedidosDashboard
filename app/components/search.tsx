'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch?: (value: string) => void;
}

export default function Search({ placeholder, onSearch }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState('');

  
  const handleSearch = (term: string) => {
    setSearchValue(term);
    
    if (onSearch) {
     
      onSearch(term);
    } else {

      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (!onSearch) {
      const initialValue = searchParams.get('query')?.toString() || '';
      setSearchValue(initialValue);
    }
  }, [searchParams, onSearch]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <svg
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}