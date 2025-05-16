"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { createPitch } from "@/lib/actions";
import { createItem } from "@/lib/actions";
import { siteInfo } from "@/app/siteConfig";

const ItemForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [pitch, setPitch] = useState("");
  const [details, setDetails] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        // pitch,
        details,
      };

      await formSchema.parseAsync(formValues);

      // const result = await createItem(prevState, formData, pitch);
      const result = await createItem(prevState, formData, details);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your work has been created successfully",
        });

        // router.push(`/startup/${result._id}`);
        router.push(`/item/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="item-form">
      <div>
        <label htmlFor="title" className="item-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="item-form_input"
          required
          placeholder="Title"
        />

        {errors.title && <p className="item-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="item-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="item-form_textarea"
          required
          placeholder="Description"
        />

        {errors.description && (
          <p className="item-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="item-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="item-form_input"
          required
          placeholder="Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="item-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="item-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="item-form_input"
          required
          placeholder="Image URL"
        />

        {errors.link && <p className="item-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="details" className="item-form_label">
          Details
        </label>

        <MDEditor
          // value={pitch}
          value={details}
          // onChange={(value) => setPitch(value as string)}
          onChange={(value) => setDetails(value as string)}
          id="details"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              // "Briefly describe your idea and what problem it solves",
              siteInfo.placeholderDesc,
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {/* {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>} */}
        {errors.details && <p className="item-form_error">{errors.details}</p>}
      </div>

      <Button
        type="submit"
        className="item-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Work"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ItemForm;
