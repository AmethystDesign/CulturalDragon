"use client"

import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  }

  return (
    // Without div, the Button is rectangle
    <div className='flex gap-2'>
      <Button type="reset" className='search-btn text-white'>
        <Link href="/" className="text-white">
          <X className="size-6" />
        </Link>
      </Button>
    </div>
  )
}

export default SearchFormReset