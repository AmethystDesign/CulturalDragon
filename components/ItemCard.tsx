import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

// import { Author, Item, ItemTypeCard } from "@/sanity/types";
import { Author, Item } from "@/sanity/types";
import { Skeleton } from './ui/skeleton'

export type ItemTypeCard = Omit<Item, "author"> & { author?: Author };

const ItemCard = ({ post }: { post: ItemTypeCard}) => {
  const {
    _createdAt,
    views,
    author, //:{_id: authorId, name},
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className='item-card group'>
      <div className='flex-between'>
        <p className='item'>
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-red-700" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

       <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
           <Link href={`/user/${author?.id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/item/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?.id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/item/${_id}`}>
        <p className="item-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="item-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="item-card_btn" asChild>
          <Link href={`/item/${_id}`}>Details</Link>
        </Button>
      </div>

    </li>
  )
}

export const ItemCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="item-card_skeleton" />
      </li>
    ))}
  </>
);

export default ItemCard