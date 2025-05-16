import SearchForm from "@/components/SearchForm";
// import { client } from "@/sanity/lib/client";
import { ITEMS_QUERY } from "@/sanity/lib/queries";
// import { groq, SanityClient } from "next-sanity";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { DisplayPrompt } from "@/lib/UiUtils";
import { homePageInfo, siteInfo } from "../siteConfig";
import { cn } from "@/lib/utils";

// import { ItemTypeCard, ItemTypeCardMatchQuery } from "@/sanity/types";
import { ItemTypeCard } from "@/sanity/types";

import ItemCard from "@/components/ItemCard";

export default async function Home({ searchParams} : {
  searchParams: Promise<{ query?: string }>
})  {
    const query = (await searchParams).query;
    const params = {search: query || null};

    //After updating the auth.ts
    const session = await auth()
    // console.log(session?.id);

    //After install server-only
    // const posts = await client.fetch(STARTUPS_QUERY);
    const { data: posts } = await sanityFetch({query: ITEMS_QUERY, params});
    const { siteScope } = siteInfo;
    const { title, subTitle, message, className } = homePageInfo;

    // const posts = await client.fetch(groq`{"startup": *[_type == "startup"]}`);
    /*
    const today = new Date();
    const timeNow = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(`====> ${timeNow} GROQ: ${STARTUPS_QUERY}`);
    console.log(JSON.stringify(posts, null, 2));
    */

    return (
    <>
      <section className="primary_color_container">
        <DisplayPrompt prompt={subTitle} className={"tag"} />        
        <DisplayPrompt prompt={title} className={className} />
        <DisplayPrompt prompt={message} className={"sub-heading !max-w-3xl"} />

        <SearchForm query={query} />
      </section>
  
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : cn("All", siteScope)}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ItemTypeCard, i: number) => (
              <ItemCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">{cn("No", siteScope, "found")}</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
