import { client } from '@/sanity/lib/client';
import { ITEMS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import ItemCard from '@/components/ItemCard';
import { ItemTypeCard } from '@/sanity/types';

const UserItems = async ({id}: {id: string}) => {

  const items = await client.fetch(ITEMS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {items.length > 0 ? (
        items.map((item: ItemTypeCard) => (
          <ItemCard key={item._id} post={item} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  )
}

export default UserItems