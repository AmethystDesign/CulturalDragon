import { siteInfo } from "@/app/siteConfig";
import { auth } from "@/auth";
import ItemForm from "@/components/ItemForm";
import { DisplayPrompt } from "@/lib/UiUtils";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  
  return (
    <>
      <section className="primary_color_container !min-h-[230px]">
        <DisplayPrompt prompt={cn("Submit Your", siteInfo.siteScope)} className={"heading"} />
      </section>

      <ItemForm />
    </>
  );
};

export default page