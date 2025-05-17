import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, ITEM_BY_ID_QUERY, ITEMS_BY_AUTHOR_NAME_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import ItemCard from '@/components/ItemCard';
// import StartupCard from '@/components/StartupCard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import React from 'react';
import { DisplayPrompt } from '@/lib/UiUtils';
import { ItemTypeCard } from '@/sanity/types';
const md =  markdownit();

export const experimental_ppr = true;

const page = async({ params}: { params: Promise<{ id: string }>}) => {
  const id = (await params).id;

  // Sequential data fetching: fetching data one after another 
  const post = await client.fetch(ITEM_BY_ID_QUERY, { id });
  // const { select: editorPosts }= await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks"})
  // console.log(`====> itemId: ${id}`);

  const name = post?.author?.name || "";
  const editorPosts = await client.fetch(ITEMS_BY_AUTHOR_NAME_QUERY, { name });

  // console.log(`====> authorName: ${name} : ${editorPosts.length} items`);
  
  //   parallel data fetching: fetching data at the same time
  // const [post, { select: editorPosts }] = await Promise.all([
  //   client.fetch(ITEM_BY_ID_QUERY, { id }),
  //   client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //     slug: "editor-picks",
  //   }),
  // ]);
  // const [post, { select: editorPosts }] = await Promise.all([
  //   client.fetch(ITEM_BY_ID_QUERY, { id }),
  //   // client.fetch(ITEMS_BY_AUTHOR_QUERY, { post?.author?._id : null, id: post?._id }),}),
  // ]);


  if(!post) return notFound();
  
  const parsedContent = md.render(post?.details || "");
  
  // console.log(`====> editorPosts: ${editorPosts}`);
  
  return (
    <>
      <section className="primary_color_container !min-h-[230px]">
        <DisplayPrompt prompt={formatDate(post?._createdAt)} className={"tag"} />       
        <DisplayPrompt prompt={post.title} className={"heading"} />
        <DisplayPrompt prompt={post.description} className={"sub-heading !max-w-3xl"} />
      </section>
      <section className="section_container">
        <div className="w-full lg:max-w-4xl gap-5 justify-center items-center">
        <img
          src={post.image!}
          alt={post.title!}
          className="w-full lg:max-w-5xl h-auto rounded-xl"
        />
        </div>
        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          {post?.author && (
            <div className="flex-between gap-5 justify-center">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={post.author.image!}  // Failed if the url is from shared google drive
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-2xl"
                />
                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username}
                  </p>
                </div>
              </Link>
              <p className="category-tag">{post.category}</p>
            </div>
          )}

          <h3 className="text-30-bold">Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className='divider' />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts?.map((post: ItemTypeCard, i: number) => (
                <ItemCard key={i} post={post ?? { _id: '', _createdAt: '', views: 0, description: '', category: '', image: '' }} />
              ))}
            </ul>
          </div>
        )}
        
     

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      
      </section>
    </>
  )
}

export default page