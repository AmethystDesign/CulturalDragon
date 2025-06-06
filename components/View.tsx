import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { ITEM_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { ItemViewsResult } from "@/sanity/types";
import { unstable_after as after } from "next/server";
//import { after } from "next/server";  //for Next.js 15

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch<ItemViewsResult>(ITEM_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: (totalViews ?? 0) + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        {/* <span className="font-black">Views: 100</span> */}
        <span className="font-black">{totalViews} views</span>
      </p>
    </div>
  );
};
export default View;
